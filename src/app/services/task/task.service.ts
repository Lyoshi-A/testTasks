import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from '../../models/task.model';
import { ITaskService } from "../../models/task.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService implements ITaskService {
  private tasksKey = 'tasks'; // key for tasks LocalStorage
  private tasksSubject = new BehaviorSubject<Task[]>(this.getTasksFromLocalStorage()); // Observable to observe list of tasks

  getTasks(): BehaviorSubject<Task[]> {
    return this.tasksSubject;
  }

  getTaskById(id: number): Task | undefined {
    const tasks = this.getTasksFromLocalStorage();
    return tasks.find(t => t.id === id);
  }

  addTask(task: Task): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage();
    tasks.push({...task, id: this.generateId(), createdAt: new Date(), updatedAt: new Date(), completed:false});
    this.updateList(tasks);
    return of(tasks);
  }

  updateTask(task: Task): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index >= 0) {
      tasks[index] = {...task, updatedAt: new Date()};
      this.updateList(tasks);
    }
    return of(tasks);
  }

  deleteTask(task: Task): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage().map(t => (t.id === task.id) ? {...t, updatedAt: new Date(), completed:true}: t);
    this.updateList(tasks);
    return of(tasks);
  }

  restoreTask(task: Task): Observable<Task[]> {
    const tasks = this.getTasksFromLocalStorage().map(t => (t.id === task.id) ? {...t, updatedAt: new Date(), completed:false}: t);
    this.updateList(tasks);
    return of(tasks);
  }

  private updateList(tasks: Task[]) {
    this.saveTasksToLocalStorage(tasks);
    this.tasksSubject.next(tasks);
  }

  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  private getTasksFromLocalStorage(): Task[] {
    const tasksString = localStorage.getItem(this.tasksKey);
    return tasksString ? JSON.parse(tasksString) : [];
  }

  // Generate a new id
  private generateId(): number {
    const tasks = this.getTasksFromLocalStorage();
    return Math.max(0, ...tasks.map((t) => t.id)) + 1;
  }
}

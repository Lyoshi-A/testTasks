import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from '../../models/task.model';
import { ITaskService } from "../../models/task.interface";

export class MockTaskService implements ITaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]); // Observable to observe list of tasks

  getTasks(): BehaviorSubject<Task[]> {
    return this.tasksSubject;
  }

  getTaskById(id: number): Task | undefined {
    return;
  }

  addTask(task: Task): Observable<Task[]> {
    return of([]);
  }

  updateTask(task: Task): Observable<Task[]> {
    return of([]);
  }

  deleteTask(task: Task): Observable<Task[]> {
    return of([]);
  }

  restoreTask(task: Task): Observable<Task[]> {
    return of([]);
  }
}

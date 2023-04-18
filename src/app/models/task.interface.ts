import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

export interface ITaskService {
  getTasks(): BehaviorSubject<Task[]>;
  getTaskById(id: number): Task | undefined;
  addTask(task: Task): Observable<Task[]>;
  updateTask(task: Task): Observable<Task[]>;
  deleteTask(task: Task): Observable<Task[]>;
  restoreTask(task: Task): Observable<Task[]>;
}

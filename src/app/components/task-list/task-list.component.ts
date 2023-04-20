import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { DialogComponent } from '../add-edit-dialog/add-edit-dialog.component';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  subTasks$: Subscription;
  errorMessage: string;

  constructor(private dialog: MatDialog, public taskService: TaskService) { }

  ngOnInit(): void {
    this.subTasks$ = this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.sort((a,b)=> b.completed ? -1: a.createdAt > b.createdAt ? 1 : -1 );
    });
  }

  openDialog(task?: Task | undefined): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: {
        task: task ,
        isNew: task ? false : true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.taskService.addTask(result.task).pipe(take(1)).subscribe();
        } else {
          this.taskService.updateTask(result.task).pipe(take(1)).subscribe();
        }
      }
    });
  }

  deleteTask(task: Task): void {
    this.errorMessage = 'done'
    // this.taskService.deleteTask(task).pipe(take(1)).subscribe(()=> this.errorMessage = 'done');
  }

  restoreTask(task: Task): void {
    this.taskService.restoreTask(task).pipe(take(1)).subscribe();
  }

  ngOnDestroy () {
    if (this.subTasks$) this.subTasks$.unsubscribe();
  }

}

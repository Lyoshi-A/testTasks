import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  isNew: string;
  task: Task;
  errorMessage: string;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.task = this.data.task;
    this.isNew = this.data.isNew;
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.task?.title, Validators.required),
      description: new FormControl(this.task?.description, Validators.required)
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.valid) {
      const updatedTask = { ...this.task, ...this.form.value };
      if (!this.isNew) {
        this.taskService.updateTask(updatedTask).subscribe({
          next: () => {
            this.dialogRef.close();
          },
          error: () => {
            this.errorMessage = 'Error updating task';
          }
        });
      } else {
        this.taskService.addTask(updatedTask).subscribe({
          next: () => {
            this.dialogRef.close();
          },
          error: () => {
            this.errorMessage = 'Error adding task';
          }
        });
      }
    }
  }
}

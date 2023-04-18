import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { DialogComponent } from './add-edit-dialog.component';
import { TaskService } from '../../services/task/task.service';
import { MockTaskService } from '../../services/task/task.service.mock';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddEditDialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let taskService: TaskService;
  const dialogRefSpyObj = jasmine.createSpyObj({
    close: () => { }
  });
  const matDialogRefMock = {
    close: () => { }
  };
  const data = {
    task: {
      id: 1,
      title: 'Task title',
      description: 'Task description',
      createdAt: new Date(),
      completed: false
    },
    isNew: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [DialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: TaskService, useClass: MockTaskService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    const form = component.form;
    expect(form.get('title')).toBeTruthy();
    expect(form.get('description')).toBeTruthy();
  });

  it('should close dialog when cancel is clicked', () => {
    // spyOn(dialogRefSpyObj, 'close').and.returnValue(null);
    component.dialogRef = dialogRefSpyObj as any;
    component.onCancelClick();
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
  });

  it('should close dialog and add task when save is clicked for new task', () => {
    const task= {
      id: 1,
      title: 'New task',
      description: 'New task description',
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false
    }
    // spyOn(dialogRefSpyObj, 'close').and.returnValue(null);
    spyOn(taskService, 'addTask').and.returnValue(of([task]));
    component.dialogRef = dialogRefSpyObj as any;
    component.isNew = true;
    component.task = undefined;
    component.form.setValue({
      title: 'New task',
      description: 'New task description'
    });
    component.onSaveClick();
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
    expect(taskService.addTask).toHaveBeenCalled();
  });

  it('should close dialog and update task when save is clicked for existing task', () => {
    const task= {
      id: 1,
        title: 'Updated task',
        description: 'Updated task description',
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false
    }
    // spyOn(dialogRefSpyObj, 'close').and.returnValue(null);
    spyOn(taskService, 'updateTask').and.returnValue(of([task]));
    component.dialogRef = dialogRefSpyObj as any;
    component.isNew = false;
    component.form.setValue({
      title: 'Updated task',
      description: 'Updated task description'
    });
    component.onSaveClick();
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
    expect(taskService.updateTask).toHaveBeenCalled();
  });

});

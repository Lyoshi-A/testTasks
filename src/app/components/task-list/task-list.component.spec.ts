import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import {BehaviorSubject, of} from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task/task.service';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask', 'updateTask', 'deleteTask', 'restoreTask']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatDividerModule,
        MatCardModule
      ],
      declarations: [ TaskListComponent ],
      providers: [
        { provide: TaskService, useValue: mockTaskService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get tasks on init', () => {
    const tasks: Task[] = [
      {id: 1, title: 'Task 1', description: 'Description 1', completed: true, createdAt: new Date('2022-04-18')},
      {id: 2, title: 'Task 2', description: 'Description 2', completed: false, createdAt: new Date('2022-04-19')},
    ];
    const tasksSubject = new BehaviorSubject<Task[]>(tasks);
    mockTaskService.getTasks.and.returnValue(tasksSubject);
    fixture.detectChanges();
    expect(component.tasks).toEqual(tasks);
  });

  it('should open add/edit dialog on button click with new task', () => {
    spyOn(component, 'openDialog');
    const addButton = fixture.debugElement.query(By.css('.add-button')).nativeElement;
    addButton.click();
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalledWith(undefined);
  });

  it('should open add/edit dialog on button click with existing task', () => {
    spyOn(component, 'openDialog');
    const task: Task = {id: 1, title: 'Task 1', description: 'Description 1', completed: true, createdAt: new Date('2022-04-18')};
    component.tasks = [task];
    fixture.detectChanges();
    const editButton = fixture.debugElement.query(By.css('.edit-button')).nativeElement;
    editButton.click();
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalledWith(task);
  });

  it('should delete task on button click', () => {
    spyOn(component, 'deleteTask');
    const task: Task = {id: 1, title: 'Task 1', description: 'Description 1', completed: true, createdAt: new Date('2022-04-18')};
    component.tasks = [task];
    fixture.detectChanges();
    const deleteButton = fixture.debugElement.query(By.css('.delete-button')).nativeElement;
    deleteButton.click();
    fixture.detectChanges();
    expect(component.deleteTask).toHaveBeenCalledWith(task);
  });

  it('should restore task on button click', () => {
    spyOn(component, 'restoreTask');
    const task: Task = {id: 1, title: 'Task 1', description: 'Description 1', completed: true, createdAt: new Date('2022-04-18')};
    component.tasks = [task];
    fixture.detectChanges();
    const restoreButton = fixture.debugElement.query(By.css('.restore-button')).nativeElement;
    restoreButton.click();
    fixture.detectChanges();
    expect(component.restoreTask).toHaveBeenCalledWith(task);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task/task.service';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTasks', 'addTask', 'updateTask', 'deleteTask', 'restoreTask']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
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
    mockTaskService.getTasks.and.returnValue(of(tasks));
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

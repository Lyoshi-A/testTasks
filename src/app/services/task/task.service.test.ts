import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../../models/task.model';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
    taskService = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should return an array of tasks', () => {
    const tasks = taskService.getTasks().getValue();
    expect(Array.isArray(tasks)).toBe(true);
  });

  it('should add a task to the list of tasks', () => {
    const tasksBefore = taskService.getTasks().getValue();
    const newTask: Task = {
      id: 1,
      title: 'New Task',
      description: 'This is a new task',
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false
    };
    taskService.addTask(newTask).subscribe(tasksAfter => {
      expect(tasksBefore.length + 1).toBe(tasksAfter.length);
    });
  });

  it('should update a task in the list of tasks', () => {
    const tasksBefore = taskService.getTasks().getValue();
    const updatedTask = { ...tasksBefore[0], title: 'Updated Task' };
    taskService.updateTask(updatedTask).subscribe(tasksAfter => {
      expect(tasksAfter.find(task => task.id === updatedTask.id)?.title).toBe(updatedTask.title);
    });
  });

  it('should delete a task from the list of tasks', () => {
    const tasksBefore = taskService.getTasks().getValue();
    const taskToDelete = tasksBefore[0];
    taskService.deleteTask(taskToDelete).subscribe(tasksAfter => {
      expect(tasksBefore.length - 1).toBe(tasksAfter.length);
      expect(tasksAfter.find(task => task.id === taskToDelete.id)).toBeFalsy();
    });
  });

  it('should restore a completed task', () => {
    const tasksBefore = taskService.getTasks().getValue();
    const completedTask = tasksBefore.find(task => task.completed);
    taskService.restoreTask(completedTask).subscribe(tasksAfter => {
      expect(tasksAfter.find(task => task.id === completedTask.id)?.completed).toBe(false);
    });
  });
});

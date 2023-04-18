export interface Task {
  id: number; // Unique identifier for the task
  title: string; // Title of the task
  description: string; // Optional description of the task
  completed: boolean; // Indicates whether the task has been completed or not
  createdAt: Date;
  updatedAt?: Date;
}

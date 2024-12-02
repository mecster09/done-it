export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export class TaskError extends Error {
  constructor(
    message: string,
    public code: string = 'TASK_ERROR',
    public status: number = 500
  ) {
    super(message);
    this.name = 'TaskError';
  }
} 
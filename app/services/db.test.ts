import { Task } from '@/app/types';
import * as db from './db';

// Mock initializeDB to return a mock IndexedDB
jest.mock('@/app/utils/db-init', () => ({
  initializeDB: () => ({
    open: jest.fn(),
    deleteDatabase: jest.fn(),
  }),
}));

describe('Database Service', () => {
  const mockTask: Omit<Task, 'id'> = {
    text: 'Test task',
    completed: false,
  };

  beforeEach(async () => {
    // Clear mocks instead of clearing DB
    jest.clearAllMocks();
  });

  it('should handle adding a task when db is not available', async () => {
    await expect(db.addTask(mockTask)).rejects.toThrow('IndexedDB not available');
  });

  it('should handle getting tasks when db is not available', async () => {
    const tasks = await db.getAllTasks();
    expect(tasks).toEqual([]);
  });

  it('should handle getting task by id when db is not available', async () => {
    const task = await db.getTaskById(1);
    expect(task).toBeUndefined();
  });

  it('should handle getting completed tasks when db is not available', async () => {
    const tasks = await db.getCompletedTasks();
    expect(tasks).toEqual([]);
  });

  it('should handle getting incomplete tasks when db is not available', async () => {
    const tasks = await db.getIncompleteTasks();
    expect(tasks).toEqual([]);
  });

  it('should handle deleting task when db is not available', async () => {
    await expect(db.deleteTask(1)).resolves.toBeUndefined();
  });

  it('should handle updating task when db is not available', async () => {
    const task: Task = { id: 1, text: 'Test', completed: false };
    await expect(db.updateTask(task)).rejects.toThrow('IndexedDB not available');
  });
}); 
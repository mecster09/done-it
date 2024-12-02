import { Task } from '@/app/types';
import { validateTask } from '@/app/utils/validation';
import * as db from './db';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    try {
      return await db.getAllTasks();
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  },

  async saveTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const validatedText = validateTask(task.text);
      return await db.addTask({
        ...task,
        text: validatedText,
      });
    } catch (error) {
      console.error('Failed to save task:', error);
      throw error;
    }
  },

  async updateTask(task: Task): Promise<Task> {
    try {
      if (task.text) {
        const validatedText = validateTask(task.text);
        task = { ...task, text: validatedText };
      }
      return await db.updateTask(task);
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      await db.deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error('Failed to delete task');
    }
  },

  async getCompletedTasks(): Promise<Task[]> {
    try {
      return await db.getCompletedTasks();
    } catch (error) {
      console.error('Failed to fetch completed tasks:', error);
      throw new Error('Failed to fetch completed tasks');
    }
  },

  async getIncompleteTasks(): Promise<Task[]> {
    try {
      return await db.getIncompleteTasks();
    } catch (error) {
      console.error('Failed to fetch incomplete tasks:', error);
      throw new Error('Failed to fetch incomplete tasks');
    }
  }
}; 
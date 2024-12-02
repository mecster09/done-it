import { openDB, DBSchema } from 'idb';
import { Task } from '@/app/types';
import { initializeDB } from '@/app/utils/db-init';
import { DatabaseNotAvailableError } from '@/app/types/errors';

interface TaskDB extends DBSchema {
  tasks: {
    value: Task;
    key: number;
    indexes: { 'by-completed': number };
  };
}

const DB_NAME = 'done-it-db';
const STORE_NAME = 'tasks';
const DB_VERSION = 1;

export const dbPromise = initializeDB() ? 
  openDB<TaskDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('by-completed', 'completed');
    },
  }) : null;

export async function getAllTasks(): Promise<Task[]> {
  const db = await dbPromise;
  if (!db) return [];
  return db.getAll(STORE_NAME);
}

export async function getTaskById(id: number): Promise<Task | undefined> {
  const db = await dbPromise;
  if (!db) return undefined;
  return db.get(STORE_NAME, id);
}

export async function addTask(task: Omit<Task, 'id'>): Promise<Task> {
  const db = await dbPromise;
  if (!db) throw new DatabaseNotAvailableError();
  const id = await db.add(STORE_NAME, {
    ...task,
    id: Date.now(), // Use timestamp as ID
  });
  const newTask = await getTaskById(id as number);
  if (!newTask) {
    throw new Error('Failed to create task');
  }
  return newTask;
}

export async function updateTask(task: Task): Promise<Task> {
  const db = await dbPromise;
  if (!db) throw new DatabaseNotAvailableError();
  await db.put(STORE_NAME, task);
  const updatedTask = await getTaskById(task.id);
  if (!updatedTask) {
    throw new Error('Failed to update task');
  }
  return updatedTask;
}

export async function deleteTask(id: number): Promise<void> {
  const db = await dbPromise;
  if (!db) return;
  await db.delete(STORE_NAME, id);
}

export async function getCompletedTasks(): Promise<Task[]> {
  const db = await dbPromise;
  if (!db) return [];
  return db.getAllFromIndex(STORE_NAME, 'by-completed', 1);
}

export async function getIncompleteTasks(): Promise<Task[]> {
  const db = await dbPromise;
  if (!db) return [];
  return db.getAllFromIndex(STORE_NAME, 'by-completed', 0);
} 
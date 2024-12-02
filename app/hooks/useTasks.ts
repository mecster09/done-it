"use client";
import { useState, useCallback, useEffect } from 'react';
import { Task } from '@/app/types';
import { useErrorHandler } from './useErrorHandler';
import { taskService } from '@/app/services/taskService';
import { validateTask } from '@/app/utils/validation';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const loadedTasks = await taskService.getTasks();
        setTasks(loadedTasks);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [handleError]);

  const addTask = useCallback(async (text: string) => {
    try {
      setIsSubmitting(true);
      const validatedText = validateTask(text);
      const newTask = await taskService.saveTask({ 
        text: validatedText, 
        completed: false 
      });
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [handleError]);

  const toggleTask = useCallback(async (id: number) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        // Optimistic update
        setTasks(prev => prev.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        ));

        const updatedTask = await taskService.updateTask({
          ...taskToUpdate,
          completed: !taskToUpdate.completed
        });

        // Update with server response
        setTasks(prev => prev.map(task => 
          task.id === id ? updatedTask : task
        ));
      }
    } catch (error) {
      // Revert optimistic update on error
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
      handleError(error);
    }
  }, [tasks, handleError]);

  const deleteTask = useCallback(async (id: number) => {
    try {
      // Optimistic update
      setTasks(prev => prev.filter(task => task.id !== id));
      await taskService.deleteTask(id);
    } catch (error) {
      // Revert optimistic update on error
      const task = tasks.find(t => t.id === id);
      if (task) {
        setTasks(prev => [...prev, task]);
      }
      handleError(error);
    }
  }, [tasks, handleError]);

  return {
    tasks,
    isLoading,
    isSubmitting,
    addTask,
    toggleTask,
    deleteTask
  };
} 
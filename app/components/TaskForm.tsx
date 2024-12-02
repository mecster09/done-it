"use client";
import { useState, FormEvent, ChangeEvent } from 'react';
import { useErrorHandler } from '@/app/hooks/useErrorHandler';
import { validateTask, ValidationError } from '@/app/utils/validation';
import { LoadingSpinner } from './LoadingSpinner';

interface TaskFormProps {
  onAdd: (text: string) => Promise<void>;
  isSubmitting: boolean;
}

export function TaskForm({ onAdd, isSubmitting }: TaskFormProps) {
  const [newTask, setNewTask] = useState("");
  const [touched, setTouched] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const validateInput = (value: string) => {
    try {
      validateTask(value);
      clearError();
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        handleError(error);
      }
      return false;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTask(value);
    if (touched) {
      validateInput(value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput(newTask);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setTouched(true);
    
    try {
      const validatedText = validateTask(newTask);
      await onAdd(validatedText);
      setNewTask("");
      setTouched(false);
    } catch (error) {
      if (error instanceof ValidationError) {
        handleError(error);
      } else {
        throw error; // Re-throw non-validation errors
      }
    }
  };

  const isValid = !error && touched && newTask.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="mb-8" noValidate>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Add a new task..."
            className={`flex-1 p-2 border rounded 
              dark:bg-gray-800 dark:border-gray-700
              ${error ? 'border-red-500 dark:border-red-500' : ''}
              ${isValid ? 'border-green-500 dark:border-green-500' : ''}
            `}
            disabled={isSubmitting}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'task-error' : undefined}
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-foreground text-background rounded hover:opacity-90 
              disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]
              flex items-center justify-center gap-2"
            disabled={isSubmitting || !!error}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner className="w-4 h-4" />
                <span>Adding...</span>
              </>
            ) : (
              'Add'
            )}
          </button>
        </div>
        {error && (
          <p 
            id="task-error" 
            className="text-red-500 text-sm mt-1"
            role="alert"
          >
            {error.message}
          </p>
        )}
        {isValid && (
          <p className="text-green-500 text-sm mt-1">
            Task is valid
          </p>
        )}
      </div>
    </form>
  );
} 
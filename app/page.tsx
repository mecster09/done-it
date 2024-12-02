"use client";
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { useTasks } from './hooks/useTasks';

export default function Home() {
  const { tasks, isLoading, isSubmitting, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <div className="min-h-screen p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">Done It - Task List</h1>
      <TaskForm onAdd={addTask} isSubmitting={isSubmitting} />
      <TaskList 
        tasks={tasks}
        isLoading={isLoading}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

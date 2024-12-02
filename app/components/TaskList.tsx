import { Task } from '@/app/types';
import { LoadingSpinner } from './LoadingSpinner';

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, isLoading = false, onToggle, onDelete }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="w-8 h-8 text-foreground/50" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-foreground/50">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <li 
          key={task.id}
          className="flex items-center gap-2 p-3 border rounded dark:border-gray-700"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5"
          />
          <span className={`flex-1 ${task.completed ? 'line-through opacity-50' : ''}`}>
            {task.text}
          </span>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
} 
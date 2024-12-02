import { renderHook, act } from '@testing-library/react';
import { useTasks } from './useTasks';
import { taskService } from '@/app/services/taskService';

// Mock the taskService
jest.mock('@/app/services/taskService', () => ({
  taskService: {
    getTasks: jest.fn(),
    saveTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  },
}));

describe('useTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (taskService.getTasks as jest.Mock).mockResolvedValue([]);
  });

  it('initializes with loading state and empty tasks', () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.tasks).toEqual([]);
  });

  it('loads tasks on mount', async () => {
    const mockTasks = [
      { id: 1, text: 'Task 1', completed: false },
    ];
    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.tasks).toEqual(mockTasks);
    expect(result.current.isLoading).toBe(false);
  });

  it('adds a new task', async () => {
    const newTask = { id: 1, text: 'New Task', completed: false };
    (taskService.saveTask as jest.Mock).mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());

    await act(async () => {
      await result.current.addTask('New Task');
    });

    expect(result.current.tasks).toContainEqual(newTask);
  });

  // Add more tests for toggleTask and deleteTask...
}); 
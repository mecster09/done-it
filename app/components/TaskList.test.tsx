import { render, screen } from '@/app/utils/test-utils';
import { TaskList } from './TaskList';
import { Task } from '@/app/types';

describe('TaskList', () => {
  const mockTasks: Task[] = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ];

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  it('renders loading state', () => {
    render(
      <TaskList
        tasks={[]}
        isLoading={true}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(
      <TaskList
        tasks={[]}
        isLoading={false}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('renders task list', () => {
    render(
      <TaskList
        tasks={mockTasks}
        isLoading={false}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('handles task toggle', async () => {
    const { user } = render(
      <TaskList
        tasks={mockTasks}
        isLoading={false}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    await user.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it('handles task deletion', async () => {
    const { user } = render(
      <TaskList
        tasks={mockTasks}
        isLoading={false}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    
    const deleteButton = screen.getAllByText(/delete/i)[0];
    await user.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
}); 
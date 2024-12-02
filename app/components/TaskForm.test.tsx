import { render, screen } from '@/app/utils/test-utils';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it('renders correctly', () => {
    render(<TaskForm onAdd={mockOnAdd} isSubmitting={false} />);
    
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('shows validation error for short input', async () => {
    const { user } = render(<TaskForm onAdd={mockOnAdd} isSubmitting={false} />);
    
    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'ab');
    await user.tab(); // trigger blur

    expect(screen.getByRole('alert')).toHaveTextContent(/at least 3 characters/i);
    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('submits valid input', async () => {
    const { user } = render(<TaskForm onAdd={mockOnAdd} isSubmitting={false} />);
    
    const input = screen.getByPlaceholderText(/add a new task/i);
    await user.type(input, 'valid task');
    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(mockOnAdd).toHaveBeenCalledWith('valid task');
  });

  it('shows loading state when submitting', () => {
    render(<TaskForm onAdd={mockOnAdd} isSubmitting={true} />);
    
    expect(screen.getByText(/adding/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
}); 
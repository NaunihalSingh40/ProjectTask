import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

const mockTasks = [
  {
    id: 1,
    title: "Morning Meeting",
    description: "Team meeting to discuss project progress.",
    date: new Date(),
    time: "09:00",
    reminder: "1_day",
    repeat: "weekly",
    status: "active",
  },
  {
    id: 2,
    title: "Review Documentation",
    description: "Review the latest project documentation.",
    date: new Date(),
    time: "11:00",
    reminder: "2_days",
    repeat: "none",
    status: "active",
  },
];

const mockUpdateTaskStatus = jest.fn();

describe('TaskList Component', () => {
  test('renders task titles correctly', () => {
    render(<TaskList tasks={mockTasks} updateTaskStatus={mockUpdateTaskStatus} />);

    expect(screen.getByText(/Morning Meeting/i)).toBeInTheDocument();
    expect(screen.getByText(/Review Documentation/i)).toBeInTheDocument();
  });

  test('calls updateTaskStatus when marking a task as completed', () => {
    render(<TaskList tasks={mockTasks} updateTaskStatus={mockUpdateTaskStatus} />);

    const completeButton = screen.getAllByText(/Complete/i)[0];
    fireEvent.click(completeButton);

    expect(mockUpdateTaskStatus).toHaveBeenCalledWith(1, 'completed');
  });

  test('displays the correct number of tasks', () => {
    render(<TaskList tasks={mockTasks} updateTaskStatus={mockUpdateTaskStatus} />);

    const tasks = screen.getAllByRole('heading', { level: 3 });
    expect(tasks.length).toBe(mockTasks.length);
  });
});

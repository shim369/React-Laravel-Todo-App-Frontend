import { fireEvent, render, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Task from './Task';
import { Todo } from '../../types/todo';

jest.mock('axios');

const mockAlert = jest.fn();
window.alert = mockAlert;

const mockTasks: Todo[] = [
  { id: 28, name: 'Python3', url: 'https://github.com/shim369', completed: true },
  { id: 30, name: 'Python', url: 'https://nuxt-django-portfolio.vercel.app/', completed: false },
];

describe('Task Component', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { tasks: mockTasks } });
    (axios.delete as jest.Mock).mockResolvedValue({ data: { code: 200, message: 'Task Deleted Successfully!' } });
  });

  test('should render task list and delete task', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Task />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(getByText('Python3')).toBeInTheDocument();
      expect(getByText('Python')).toBeInTheDocument();
    });

    const row = getByText('Python3').closest('tr');
    if (row) {
      const deleteButton = within(row).getByTestId('delete-button-28');
      fireEvent.click(deleteButton);
    }

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:8000/api/delete_task/28');
      expect(mockAlert).toHaveBeenCalledWith('Task Deleted Successfully!');
    });
  });


});

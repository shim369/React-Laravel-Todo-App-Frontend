import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Task from './Task';
import { Todo } from '../../types/todo';

jest.mock('axios');

const mockTasks: Todo[] = [
  { id: 28, name: 'Python3', url: 'https://github.com/shim369', completed: true },
  { id: 30, name: 'Python', url: 'https://nuxt-django-portfolio.vercel.app/', completed: false },
];

describe('Task Component', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { tasks: mockTasks } });
    (axios.delete as jest.Mock).mockResolvedValue({ data: { code: 200, message: 'Task deleted successfully!' } });
  });

  test('should render task list', async () => {
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
  });

});

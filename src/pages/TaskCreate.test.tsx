import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import TaskCreate from './TaskCreate';

jest.mock('axios');

const mockAlert = jest.fn();
window.alert = mockAlert;

describe('TaskCreate Component', () => {
  test('should submit form data and show success message', async () => {
    const mockPost = axios.post as jest.Mock;
    const mockResponse = { data: { message: 'Task Created Successfully!' } };
    mockPost.mockResolvedValue(mockResponse);

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <TaskCreate />
      </MemoryRouter>
    );
    const taskNameInput = getByLabelText('Task Name', { selector: 'input' });
    const taskUrlInput = getByLabelText('Task URL', { selector: 'input' });
    const saveButton = getByText('Save Task');

    fireEvent.change(taskNameInput, { target: { value: 'Python3' } });
    fireEvent.change(taskUrlInput, { target: { value: 'https://github.com/shim369' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('http://127.0.0.1:8000/api/save_task', {
        name: 'Python3',
        url: 'https://github.com/shim369',
      });
    });

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Task Created Successfully!');
      expect(window.location.pathname).toEqual('/');
    });
  });
});

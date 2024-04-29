import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import TaskEdit from './TaskEdit';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 28 }),
}));

const mockAlert = jest.fn();
window.alert = mockAlert;

test('should update task and show success message (assuming successful API call)', async () => {
  const mockResponse = { data: { id: 28, name: 'Python3', url: 'https://github.com/shim369', completed: true } };
  const mockPost = jest.spyOn(axios, 'post');
  mockPost.mockResolvedValueOnce({ data: { message: 'Task Updated Successfully!' } });
  const mockGet = jest.spyOn(axios, 'get');
  mockGet.mockResolvedValueOnce(mockResponse);

  const { getByLabelText, getByText, getByRole } = render(<MemoryRouter initialEntries={['/tasks/28/edit']}><TaskEdit /></MemoryRouter>);

  const taskNameInput = getByLabelText('Task Name', { selector: 'input' });
  const taskUrlInput = getByLabelText('Task URL', { selector: 'input' });
  const taskCompletedCheckbox = getByRole('checkbox') as HTMLInputElement;
  const saveButton = getByText('Update Task', { selector: 'button' });

  fireEvent.change(taskNameInput, { target: { value: 'Python2' } });
  fireEvent.change(taskUrlInput, { target: { value: 'https://github.com/shim360' } });
  taskCompletedCheckbox.checked = false;
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith('http://127.0.0.1:8000/api/update_task/28', {
      name: 'Python2',
      url: 'https://github.com/shim360',
      completed: false,
    });
  });

  await waitFor(() => {
    expect(mockAlert).toHaveBeenCalledWith('Task Updated Successfully!');
    expect(window.location.pathname).toEqual('/');
  });
});

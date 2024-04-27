import { render, screen } from '@testing-library/react';
import Task from './Task';

test('renders Task', () => {
  render(<Task />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

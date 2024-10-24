import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Books heading', () => {
  render(<App />);
  const booksElement = screen.getByText(/books/i);
  expect(booksElement).toBeInTheDocument();
});

test('renders Selections heading', () => {
  render(<App />);
  const selectionsElement = screen.getByText(/selections/i);
  expect(selectionsElement).toBeInTheDocument();
});

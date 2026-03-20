import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bookstore title', () => {
  render(<App />);
  const title = screen.getByText(/boutique de livres/i);
  expect(title).toBeInTheDocument();
});

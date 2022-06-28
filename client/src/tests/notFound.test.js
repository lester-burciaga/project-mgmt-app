import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '../pages/NotFound';

test('display NotFound page', () => {
  render(<NotFound />, { wrapper: MemoryRouter });

  const errorTitle = screen.getByRole('heading', { name: /404/i });
  const description = screen.getByText(/sorry, this page does not exist/i);
  const backButton = screen.getByRole('link', { name: /go back/i });

  expect(errorTitle).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(backButton).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './home';

test('renders home', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/this is home/i);
  expect(linkElement).toBeInTheDocument();
});

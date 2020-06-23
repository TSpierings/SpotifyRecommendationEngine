import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './home';

test('renders app title', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/some sweet app name/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders a authentication button', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/Click here to authenticate Spotify/i);
  expect(linkElement).toBeInTheDocument();
});

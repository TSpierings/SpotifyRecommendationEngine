import React from 'react';
import { render } from '@testing-library/react';
import { About } from './about';

test('renders about', () => {
  const { getByText } = render(<About />);
  const linkElement = getByText(/this is about/i);
  expect(linkElement).toBeInTheDocument();
});

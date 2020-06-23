import React from 'react';
import { render } from '@testing-library/react';
import Recommender from './recommender';

test('renders recommender', () => {
  const { getByText } = render(<Recommender />);
  const linkElement = getByText(/this is recommender/i);
  expect(linkElement).toBeInTheDocument();
});

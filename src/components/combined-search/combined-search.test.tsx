import React from 'react';
import { render } from '@testing-library/react';
import { CombinedSearch } from './combined-search';

test('renders CombinedSearch', () => {
  const { getByText } = render(<CombinedSearch />);
  const linkElement = getByText(/this is CombinedSearch/i);
  expect(linkElement).toBeInTheDocument();
});

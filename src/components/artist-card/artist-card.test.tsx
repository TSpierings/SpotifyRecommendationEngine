import React from 'react';
import { render } from '@testing-library/react';
import { ArtistCard } from './artist-card';

test('renders ArtistCard', () => {
  const { getByText } = render(<ArtistCard />);
  const linkElement = getByText(/this is ArtistCard/i);
  expect(linkElement).toBeInTheDocument();
});

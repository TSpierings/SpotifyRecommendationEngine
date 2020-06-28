import React from 'react';
import { render } from '@testing-library/react';
import { TrackCard } from './track-card';

test('renders ArtistCard', () => {
  const { getByText } = render(<TrackCard />);
  const linkElement = getByText(/this is TrackCard/i);
  expect(linkElement).toBeInTheDocument();
});

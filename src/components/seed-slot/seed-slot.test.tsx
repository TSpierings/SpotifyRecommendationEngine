import React from 'react';
import { render } from '@testing-library/react';
import { SeedSlot } from './seed-slot';

test('renders SeedSlot', () => {
  const { getByText } = render(<SeedSlot />);
  const linkElement = getByText(/this is SeedSlot/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import { RecommendationResults } from './recommendation-results';

test('renders RecommendationResults', () => {
  const { getByText } = render(<RecommendationResults />);
  const linkElement = getByText(/this is RecommendationResults/i);
  expect(linkElement).toBeInTheDocument();
});

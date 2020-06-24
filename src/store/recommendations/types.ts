export const POPULATE_GENRE_SEEDS = 'POPULATE_GENRE_SEEDS';

export interface RecommendationState {
  availableGenreSeeds: Array<string> | null;
};

interface PopulateGenreSeedsAction {
  type: typeof POPULATE_GENRE_SEEDS,
  payload: Array<string>
};

export type RecommendationActionTypes = PopulateGenreSeedsAction;

import { RecommendationActionTypes, RecommendationState, POPULATE_GENRE_SEEDS } from './types';

const initialState: RecommendationState = {
  availableGenreSeeds: null
};

export function recommendationReducer(
  state = initialState,
  action: RecommendationActionTypes
): RecommendationState {
  switch (action.type) {
    case POPULATE_GENRE_SEEDS:
      return {
        availableGenreSeeds: action.payload
      };
    default:
      return state;
  }
}

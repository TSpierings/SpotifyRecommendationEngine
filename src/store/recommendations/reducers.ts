import { RecommendationActionTypes, RecommendationState, POPULATE_GENRE_SEEDS, SEARCH_ITEMS } from './types';

const initialState: RecommendationState = {
  availableGenreSeeds: null,
  foundArtists: null,
  foundTracks: null
};

export function recommendationReducer(
  state = initialState,
  action: RecommendationActionTypes
): RecommendationState {
  switch (action.type) {
    case POPULATE_GENRE_SEEDS:
      return Object.assign({}, state, {
        availableGenreSeeds: action.payload
      });
    case SEARCH_ITEMS:
      return Object.assign({}, state, {
        foundArtists: action.payload.artists,
        foundTracks: action.payload.tracks
      });
    default:
      return state;
  }
}

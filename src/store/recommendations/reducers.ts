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
      return parseSearchItemResult(state, action.payload);
    default:
      return state;
  }
}

function parseSearchItemResult(state: RecommendationState, data: any): RecommendationState {
  return Object.assign({}, state, {
    foundArtists: data.artists.items,
    foundTracks: data.tracks.items
  });
}

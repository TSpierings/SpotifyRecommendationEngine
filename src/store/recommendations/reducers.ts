import { POPULATE_GENRE_SEEDS, RecommendationActionTypes, RecommendationState, SEARCH_ITEMS, SET_SEED } from './types';

const initialState: RecommendationState = {
  availableGenreSeeds: null,
  foundArtists: null,
  foundTracks: null,
  selectedSeeds: [null, null, null, null, null]
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
    case SET_SEED:
      const seeds = state.selectedSeeds;
      seeds[action.payload.index] = action.payload.seed;

      console.log(`Selected ${action.payload.seed} to ${action.payload.index}`);
      
      return Object.assign({}, state, {
        selectedSeeds: seeds
      })
    default:
      return state;
  }
}

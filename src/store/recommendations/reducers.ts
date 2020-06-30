import { POPULATE_GENRE_SEEDS, RecommendationActionTypes, RecommendationState, SEARCH_ITEMS, SET_SEED, SET_ACTIVE_SEED_SLOT, SET_RECOMMENDATION_RESULTS } from './types';

const initialState: RecommendationState = {
  availableGenreSeeds: null,
  foundArtists: null,
  foundTracks: null,
  selectedSeeds: [null, null, null, null, null],
  activeSeedSlot: null,
  recommendationResults: null
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
      const seeds = Array.of(...state.selectedSeeds);
      seeds[action.payload.index] = action.payload.seed;
      
      return Object.assign({}, state, {
        selectedSeeds: seeds,
        activeSeedSlot: null
      });
    case SET_ACTIVE_SEED_SLOT:
      return Object.assign({}, state, {
        activeSeedSlot: action.payload
      });
    case SET_RECOMMENDATION_RESULTS:
      return Object.assign({}, state, {
        recommendationResults: action.payload
      });
    default:
      return state;
  }
}

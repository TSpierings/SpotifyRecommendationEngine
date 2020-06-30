import { Artist } from "../../interfaces/spotify/artist";
import { Track } from "../../interfaces/spotify/track";

export const POPULATE_GENRE_SEEDS = 'POPULATE_GENRE_SEEDS';
export const SEARCH_ITEMS = 'SEARCH_ITEMS';
export const SET_SEED = 'SET_SEED';
export const SET_ACTIVE_SEED_SLOT = 'SET_ACTIVE_SEED_SLOT';
export const SET_RECOMMENDATION_RESULTS = 'SET_RECOMMENDATION_RESULTS';

export interface RecommendationState {
  availableGenreSeeds: Array<string> | null;
  foundArtists: Array<Artist> | null;
  foundTracks: Array<Track> | null;
  selectedSeeds: Array<Artist | Track | string | null>;
  activeSeedSlot: number | null;
  recommendationResults: Array<Track> | null;
};

interface PopulateGenreSeedsAction {
  type: typeof POPULATE_GENRE_SEEDS,
  payload: Array<string>
};

interface SearchItemsAction {
  type: typeof SEARCH_ITEMS,
  payload: { artists: Array<Artist>, tracks: Array<Track> }
}

interface SetSeedAction {
  type: typeof SET_SEED,
  payload: { seed: Artist | Track | string, index: number }
}

interface SetActiveSeedSlot {
  type: typeof SET_ACTIVE_SEED_SLOT,
  payload: number
}

interface SetRecommendationResults {
  type: typeof SET_RECOMMENDATION_RESULTS,
  payload: Array<Track>
}

export type RecommendationActionTypes = PopulateGenreSeedsAction | SearchItemsAction | SetSeedAction | SetActiveSeedSlot | SetRecommendationResults;

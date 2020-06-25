import { Artist } from "../../interfaces/spotify/artist";
import { Track } from "../../interfaces/spotify/track";

export const POPULATE_GENRE_SEEDS = 'POPULATE_GENRE_SEEDS';
export const SEARCH_ITEMS = 'SEARCH_ITEMS';

export interface RecommendationState {
  availableGenreSeeds: Array<string> | null;
  foundArtists: Array<Artist> | null;
  foundTracks: Array<Track> | null;
};

interface PopulateGenreSeedsAction {
  type: typeof POPULATE_GENRE_SEEDS,
  payload: Array<string>
};

interface SearchItemsAction {
  type: typeof SEARCH_ITEMS,
  payload: any
}

export type RecommendationActionTypes = PopulateGenreSeedsAction | SearchItemsAction;

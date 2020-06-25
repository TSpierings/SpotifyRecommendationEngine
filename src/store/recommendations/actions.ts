import { RecommendationActionTypes, POPULATE_GENRE_SEEDS, SEARCH_ITEMS } from './types';
import { getAvailableGenreSeeds } from '../../api/recommendations';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { Action } from 'redux';
import { SearchTypes, getSearchItems } from '../../api/search';
import { Track } from '../../interfaces/spotify/track';
import { Artist } from '../../interfaces/spotify/artist';

export function populateGenreSeeds(seeds: Array<string>): RecommendationActionTypes {
  return {
    type: POPULATE_GENRE_SEEDS,
    payload: seeds
  }
}

export function fetchAndPopulateGenreSeeds(): ThunkAction<void, RootState, unknown, Action<Array<string>>> {
  return async function(dispatch: any, getState: any) {
    try {
      const response = await getAvailableGenreSeeds(getState().authentication.access_token);
      const data = await response.json();
      return dispatch(populateGenreSeeds(data.genres));
    }
    catch (error) {
      return console.log(error);
    }
  }
}

export function searchItems(artists: Array<Artist>, tracks: Array<Track>): RecommendationActionTypes {
  return {
    type: SEARCH_ITEMS,
    payload: { artists, tracks }
  }
}

export function fetchSearchItems(query: string, types: Array<SearchTypes>): ThunkAction<void, RootState, unknown, Action<Array<string>>> {
  return async function(dispatch: any, getState: any) {
    try {
      const response = await getSearchItems(getState().authentication.access_token, query, types);
      const data = await response.json();
      return dispatch(searchItems(
        data.artists.items,
        data.tracks.items
      ));
    }
    catch (error) {
      return console.log(error);
    }
  }
}

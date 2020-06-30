import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { getAvailableGenreSeeds, getRecommendations } from '../../api/recommendations';
import { getSearchItems, SearchTypes } from '../../api/search';
import { Artist } from '../../interfaces/spotify/artist';
import { Track } from '../../interfaces/spotify/track';
import { POPULATE_GENRE_SEEDS, RecommendationActionTypes, SEARCH_ITEMS, SET_SEED, SET_ACTIVE_SEED_SLOT, SET_RECOMMENDATION_RESULTS } from './types';
import { isString } from 'util';

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

      // const data = await JSON.parse(mockGenreSeeds);

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

      // const data = await JSON.parse(mockResult);

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

export function setSeed(seed: Artist | Track | string, index: number): RecommendationActionTypes {
  return {
    type: SET_SEED,
    payload: { seed, index }
  }
}


export function setActiveSeedSlot(slot: number): RecommendationActionTypes {
  return {
    type: SET_ACTIVE_SEED_SLOT,
    payload: slot
  }
}

export function setRecommmendationResults(tracks: Array<Track>): RecommendationActionTypes {
  return {
    type: SET_RECOMMENDATION_RESULTS,
    payload: tracks
  }
}

export function fetchRecommendationResults(): ThunkAction<void, RootState, unknown, Action<Array<string>>> {
  return async function(dispatch: any, getState: any) {
    try {
      const seeds = getState().recommendation.selectedSeeds as Array<Artist | Track | string | null>;

      const artists = seeds
        .filter(seed => !isString(seed) && seed?.type === 'artist')
        .map(artist => (artist as Artist).id);
      const tracks = seeds
        .filter(seed => !isString(seed) && seed?.type === 'track')
        .map(track => (track as Track).id);
      const genres = seeds
        .filter(seed => isString(seed))
        .map(genre => genre! as string);

      const response = await getRecommendations(
        getState().authentication.access_token,
        artists,
        tracks,
        genres);
      const data = await response.json();

      return dispatch(setRecommmendationResults(data.tracks));
    }
    catch (error) {
      return console.log(error);
    }
  }
}

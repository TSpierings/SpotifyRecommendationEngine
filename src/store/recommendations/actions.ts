import { RecommendationActionTypes, POPULATE_GENRE_SEEDS } from './types';
import { getAvailableGenreSeeds } from '../../api/recommendations';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { Action } from 'redux';

export function PopulateGenreSeeds(seeds: Array<string>): RecommendationActionTypes {
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
      return dispatch(PopulateGenreSeeds(data));
    }
    catch (error) {
      return console.log(error);
    }
  }
}

import { combineReducers } from 'redux';
import { authenticationReducer } from './authentication/reducers';
import { recommendationReducer } from './recommendations/reducers';

export const rootReducer = combineReducers({
  authentication: authenticationReducer,
  recommendation: recommendationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

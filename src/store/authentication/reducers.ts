import { AuthenticationActionTypes, AuthenticationState, LOGIN } from './types';

const initialState: AuthenticationState = {
  access_token: null,
  valid_until: null
};

export function authenticationReducer(
  state = initialState,
  action: AuthenticationActionTypes
): AuthenticationState {
  switch (action.type) {
    case LOGIN:
      return {
        access_token: action.payload.access_token,
        valid_until: action.payload.valid_until
      };
    default:
      return state;
  }
}

import { AuthenticationActionTypes, LOGIN } from './types';

export function login(access_token: string, valid_until: number): AuthenticationActionTypes {
  return {
    type: LOGIN,
    payload: {
      access_token,
      valid_until
    }
  }
}

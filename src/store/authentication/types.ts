export const LOGIN = 'LOGIN';

export interface AuthenticationState {
  access_token: string | null;
  valid_until: number | null;
};

interface LoginAction {
  type: typeof LOGIN,
  payload: {
    access_token: string,
    valid_until: number
  }
}

export type AuthenticationActionTypes = LoginAction;

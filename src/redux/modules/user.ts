import { typedAction } from "../typedActions";

type AuthenticationState = {
  access_token: string | null;
  valid_until: number | null;
};

const initialState: AuthenticationState = {
  access_token: null,
  valid_until: null
};

export const login = (access_token: string, valid_until: number) => {
  return typedAction('user/LOGIN', { access_token, valid_until });
};

export const logout = () => {
  return typedAction('user/LOGOUT');
};

type UserAction = ReturnType<typeof login | typeof logout>;

export function userReducer(
  state = initialState,
  action: UserAction
): AuthenticationState {
  switch (action.type) {
    case 'user/LOGIN':
      return {
        access_token: action.payload.access_token,
        valid_until: action.payload.valid_until
      };
    case 'user/LOGOUT':
      return {
        access_token: null,
        valid_until: null
      };
    default:
      return state;
  }
}

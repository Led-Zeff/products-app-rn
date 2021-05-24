import { AppUser } from '../model/user';

export interface AuthState {
  status: 'verifying' | 'authenticated' | 'unauthenticated';
  token?: string;
  errorMessage?: string;
  user?: AppUser;
}

type AuthAction =
  | {
      type: 'sign-in';
      payload: { token: string; user: AppUser };
    }
  | { type: 'set-error'; payload: string }
  | { type: 'remove-error' }
  | { type: 'unauthenticate' }
  | { type: 'logout' };

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'set-error':
      return {
        ...state,
        user: undefined,
        token: undefined,
        status: 'unauthenticated',
        errorMessage: action.payload,
      };
    case 'remove-error':
      return {
        ...state,
        errorMessage: undefined,
      };
    case 'sign-in':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'unauthenticate':
    case 'logout':
      return {
        ...state,
        status: 'unauthenticated',
        token: undefined,
        user: undefined,
      };
    default:
      return state;
  }
};

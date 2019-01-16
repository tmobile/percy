import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';
import { BackendActionTypes, CheckoutSuccess } from '../actions/backend.actions';
import { User } from 'models/auth';

export interface State {
  currentUser: User;
  loginError: Error;
  formProcessing: boolean;
  redirectUrl: string;
}

export const initialState: State = {
  currentUser: null,
  loginError: null,
  formProcessing: false,
  redirectUrl: null,
};

export function reducer(state = initialState, action: AuthActionsUnion|CheckoutSuccess): State {
  switch (action.type) {

    case AuthActionTypes.Login: {
      return {
        ...state,
        loginError: null,
        formProcessing: true,
      };
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loginError: null,
        formProcessing: false,
        currentUser: action.payload
      };
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        loginError: action.payload,
        formProcessing: false,
      };
    }

    case AuthActionTypes.LoginRedirect: {
      return {
        ...initialState,
        redirectUrl: action.payload.redirectUrl
      };
    }

    case AuthActionTypes.LogoutSuccess: {
      return initialState;
    }

    case BackendActionTypes.CheckoutSuccess: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          branchName: action.payload.branch
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getCurrentUser = (state: State) => state.currentUser;
export const getError = (state: State) => state.loginError;
export const getFormProcessing = (state: State) => state.formProcessing;
export const getRedirectUrl = (state: State) => state.redirectUrl;

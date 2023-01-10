import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'app/core/user/user.types';
import * as AuthActions from './auth.actions';

export interface State {
    user: User,
}

export const initialState: State = {
    user: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.getUserDataSucceededAction, (state: State, { payload }) => {
    return {
      ...state,
      user: payload
    }
  })
);

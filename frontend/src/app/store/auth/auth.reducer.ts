import { Action, createReducer, on } from '@ngrx/store';

export interface State {

}

export const initialState: State = {

};

export const AuthReducer = createReducer(
  initialState,

);

export function reducer(
  state: State | undefined,
  action: Action) {
  return AuthReducer(state, action);
}
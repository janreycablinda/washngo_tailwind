import { Action, createReducer, on } from '@ngrx/store';
import * as Notification from './snackbar.actions'

export interface State {
  type: String,
  message: String
}

export const initialState: State = {
  type: '',
  message: ''
};

export const NotificationReducer = createReducer(
  initialState,
  on(Notification.notificationResponse, (state: State, { payload }) =>{
    return { ...state, ...payload};
  }),
);

export function reducer(
  state: State | undefined,
  action: Action) {
  return NotificationReducer(state, action);
}
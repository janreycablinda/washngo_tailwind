import { Action, createReducer, on } from '@ngrx/store';
import * as SalesActions from './sales.actions';

export const salesFeatureKey = 'sales';

export interface State {
  transactions: []
}

export const initialState: State = {
  transactions: []
};

export const reducer = createReducer(
  initialState,
  on(SalesActions.loadSalesSucceededAction, (state: State, { payload }) =>
  {
    return {
      ...state,
      transactions: payload
    }
  })
);

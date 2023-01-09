import { Action, createReducer, on } from '@ngrx/store';
import { DiscountDTO } from 'app/models/discounts';
import * as DiscountActions from './discounts.actions';

export const discountsFeatureKey = 'discounts';

export interface State {
  discounts: DiscountDTO[]
}

export const initialState: State = {
  discounts: []
};

export const reducer = createReducer(
  initialState,
  on(DiscountActions.loadDiscountSucceededAction, (state: State, { payload }) =>
  {
    return {
      ...state,
      discounts: payload
    }
  })
);

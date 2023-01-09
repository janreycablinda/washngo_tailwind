import { createAction, props } from '@ngrx/store';

export const loadDiscountRequestedAction = createAction(
  '[Discounts] Load Discount Requested Action'
);

export const loadDiscountSucceededAction = createAction(
  '[Discounts] Load Discount Succeeded Action',
  props<{ payload: any }>()
);

export const discountDiscountssFailure = createAction(
  '[Discounts] Discount Discountss Failure',
  props<{ error: any }>()
);

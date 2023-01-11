import { createAction, props } from '@ngrx/store';

export const loadSalesRequestedAction = createAction(
  '[Sales] Load Sales Requested Action'
);

export const loadSalesSucceededAction = createAction(
  '[Sales] Load Sales Succeeded Action',
  props<{ payload: any }>()
);

export const salesSalessFailure = createAction(
  '[Sales] Sales Saless Failure',
  props<{ error: any }>()
);

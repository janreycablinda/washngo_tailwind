import { createAction, props } from '@ngrx/store';

export const salesSaless = createAction(
  '[Sales] Sales Saless'
);

export const salesSalessSuccess = createAction(
  '[Sales] Sales Saless Success',
  props<{ data: any }>()
);

export const salesSalessFailure = createAction(
  '[Sales] Sales Saless Failure',
  props<{ error: any }>()
);

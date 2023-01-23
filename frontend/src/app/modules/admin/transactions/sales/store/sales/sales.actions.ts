import { createAction, props } from '@ngrx/store';

export const loadSalesRequestedAction = createAction(
  '[Sales] Load Sales Requested Action'
);

export const loadSalesSucceededAction = createAction(
  '[Sales] Load Sales Succeeded Action',
  props<{ payload: any }>()
);

export const addSaleRequestedAction = createAction(
  '[Sales] Add Sale Requested Action',
  props<{ payload: any }>()
);

export const addSaleSucceededAction = createAction(
  '[Sales] Add Sale Succeeded Action',
  props<{ payload: any }>()
);

export const loadWorkOrderRequestedAction = createAction(
  '[Sales] Load Work Order Requested Action'
);

export const loadWorkOrderSucceededAction = createAction(
  '[Sales] Load Work Order Succeeded Action',
  props<{ payload: any }>()
);

export const deleteSaleRequestedAction = createAction(
  '[Sales] Delete Sale Requested Action',
  props<{ id: any }>()
);

export const deleteSaleSucceededAction = createAction(
  '[Sales] Delete Sale Succeeded Action',
  props<{ id: any }>()
);

export const salesSalessFailure = createAction(
  '[Sales] Sales Saless Failure',
  props<{ error: any }>()
);

import { createAction, props } from '@ngrx/store';

export const loadCategoryRequestedAction = createAction(
  '[Category] Load Category Requested Action'
);

export const loadCategorySucceededAction = createAction(
  '[Category] Load Category Succeeded Action',
  props<{ payload: any }>()
);

export const categoryCategorysFailure = createAction(
  '[Category] Category Categorys Failure',
  props<{ error: any }>()
);

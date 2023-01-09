import { createAction, props } from '@ngrx/store';

export const loadServicesRequestedAction = createAction(
  '[Services] Load Services Requested Action'
);

export const loadServicesSucceededAction = createAction(
  '[Services] Load Services Succeeded Action',
  props<{ payload: any }>()
);

export const loadSelectedServicesRequestedAction = createAction(
  '[Services] Load Selected Services Requested Action',
  props<{ payload: any }>()
);

export const loadSelectedServicesSucceededAction = createAction(
  '[Services] Load Selected Services Succeeded Action',
  props<{ payload: any }>()
);

export const servicesServicessFailure = createAction(
  '[Services] Services Servicess Failure',
  props<{ error: any }>()
);

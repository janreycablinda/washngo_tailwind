import { createAction, props } from '@ngrx/store';

export const loadVehiclesRequestedAction = createAction(
  '[Vehicles] Load Vehicles Requested Action'
);

export const loadVehiclesSucceededAction = createAction(
  '[Vehicles] Load Vehicles Succeeded Action',
  props<{ payload: any }>()
);

export const vehiclesVehiclessFailure = createAction(
  '[Vehicles] Vehicles Vehicless Failure',
  props<{ error: any }>()
);

import { Action, createReducer, on } from '@ngrx/store';
import * as VehicleActions from './vehicles.actions';
import { VehicleDTO } from '../../models/vehicles';

export interface State {
  vehicles: VehicleDTO[]
}

export const initialState: State = {
  vehicles: []
};

export const reducer = createReducer(
  initialState,
  on(VehicleActions.loadVehiclesSucceededAction, (state: State, { payload }) =>
  {
    return {
      ...state,
      vehicles: payload
    }
  })
);

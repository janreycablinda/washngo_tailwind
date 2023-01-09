import { Action, createReducer, on } from '@ngrx/store';
import { ServiceDTO } from 'app/models/services';
import * as ServicesActions from './services.actions'

export const servicesFeatureKey = 'services';

export interface State {
  services: ServiceDTO[],
  selected_services: ServiceDTO[]
}

export const initialState: State = {
  services: [],
  selected_services: []
};

export const reducer = createReducer(
  initialState,
  on(ServicesActions.loadSelectedServicesSucceededAction, (state: State, { payload }) =>
  {
    return {
      ...state,
      selected_services: payload
    }
  })
);

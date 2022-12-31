import { Action, createReducer, on } from '@ngrx/store';
import * as ChartActions from './chart.actions';

export const chartFeatureKey = 'chart';

export interface State {
  chart: Object[]
}

export const initialState: State = {
  chart: []
};

export const reducer = createReducer(
  initialState,
  on(ChartActions.loadChartSucceededAction, (state: State, { payload }) =>
  {
    return {
      ...state,
      chart: payload
    }
  }),
);

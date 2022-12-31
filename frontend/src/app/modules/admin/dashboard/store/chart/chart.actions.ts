import { createAction, props } from '@ngrx/store';

export const loadChartRequestedAction = createAction(
  '[Chart] Load Chart Requested Action',
  props<{ year: number }>()
);

export const loadChartSucceededAction = createAction(
  '[Chart] Load Chart Succeeded Action',
  props<{ payload: any }>()
);

export const chartChartsFailure = createAction(
  '[Chart] Chart Charts Failure',
  props<{ error: any }>()
);

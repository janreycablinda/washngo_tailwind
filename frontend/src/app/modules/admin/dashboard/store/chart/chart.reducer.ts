import { createReducer, on } from '@ngrx/store';
import * as ChartActions from './chart.actions';
import { ChartOptions } from 'app/models/chart-options';

export const chartFeatureKey = 'chart';

export interface State {
    chartSalesSeries: Object[],
    chartTargetSeries: Object[],
}

export const initialState: State = {
    chartSalesSeries: [],
    chartTargetSeries: [],
};

export const chartReducer = createReducer(
    initialState,
    on(ChartActions.loadChartSucceededAction, (state: State, { payload }) => {
        return {
            ...state,
            chartSalesSeries: payload
        }
    }),
    on(ChartActions.loadTargetChartSucceededAction, (state: State, { payload }) => {
        return {
            ...state,
            chartTargetSeries: payload
        }
    }),
    on(ChartActions.updateTargetChartRequestedAction, (state: State, { payload }) => {
        return {
            ...state,
            chartTargetSeries: payload["form"]
        }
    })
);

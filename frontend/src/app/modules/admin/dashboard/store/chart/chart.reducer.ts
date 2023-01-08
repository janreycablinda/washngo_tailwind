import { createReducer, on } from '@ngrx/store';
import * as ChartActions from './chart.actions';
import { ChartOptions } from 'app/models/chart-options';

export const chartFeatureKey = 'chart';

export interface State {
    salesSeries: object[];
    salesTargetSeries: object;

    //
    error: any;
    loading: boolean;
}

export const initialState: State = {
    salesSeries: [],
    salesTargetSeries: null,

    //
    error: null,
    loading: false,
};

export const chartReducer = createReducer(
    initialState,
    on(ChartActions.loadSalesSeriesSucceededAction, (state: State, { payload }) => {
        return {
            ...state,
            salesSeries: payload,
            loading: false,
        }
    }),
    on(ChartActions.loadSalesSeriesFailedAction, (state: State, { error }) => {
        return {
            ...state,
            error: error,
            loading: false,
        }
    }),
    on(ChartActions.loadTargetSalesSeriesSucceededAction, (state: State, { payload }) => {
        return {
            ...state,
            salesTargetSeries: payload,
            loading: false,
        }
    }),

);

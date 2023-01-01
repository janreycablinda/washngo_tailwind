import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';


export const selectChartsState = createFeatureSelector<AppState["chart"]>('chart');

export const salesChartData = createSelector(
    selectChartsState,
    (chart) => chart.chartSalesSeries
);

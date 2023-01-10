import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';

export const selectChartsState = createFeatureSelector<AppState["chart"]>('chart');

export const salesSeriesData = createSelector(
    selectChartsState,
    (chart) => chart.salesSeries
);

export const salesTargetSeriesData = createSelector(
    selectChartsState,
    (chart) => chart.salesTargetSeries
);

export const salesCountsData = createSelector(
    selectChartsState,
    (chart) => chart.salesCounts
);

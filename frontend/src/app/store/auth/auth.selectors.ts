import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';

export const selectAuthState = createFeatureSelector<AppState["auth"]>('auth');

export const userData = createSelector(
    selectAuthState,
    (chart) => chart.user
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'app/store/app.reducer';

export const selectSalesState = createFeatureSelector<AppState["sales"]>('sales');

export const salesData = createSelector(
    selectSalesState,
    (sales) => sales.transactions
);
import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from './auth/auth.reducer';
import * as fromNotification from '../shared/snackbar/store/snackbar.reducer';
import * as fromChart from 'app/modules/admin/dashboard/store/chart/chart.reducer';
import * as fromNotes from 'app/modules/admin/dashboard/store/notes/notes.reducer';
import * as fromVehicle from 'app/store/vehicles/vehicles.reducer';
import * as fromCategory from 'app/store/category/category.reducer';
import * as fromServices from 'app/store/services/services.reducer';
import * as fromDiscounts from 'app/modules/admin/transactions/sales/store/discounts/discounts.reducer';
import * as fromSales from 'app/modules/admin/transactions/sales/store/sales/sales.reducer';


export interface AppState {
    auth: fromAuth.State;
    notification: fromNotification.State;
    chart: fromChart.State;
    notes: fromNotes.State;
    vehicles: fromVehicle.State;
    categories: fromCategory.State;
    services: fromServices.State;
    discounts: fromDiscounts.State;
    sales: fromSales.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    notification: fromNotification.NotificationReducer,
    chart: fromChart.chartReducer,
    notes: fromNotes.notesReducer,
    vehicles: fromVehicle.reducer,
    categories: fromCategory.reducer,
    services: fromServices.reducer,
    discounts: fromDiscounts.reducer,
    sales: fromSales.reducer,
};

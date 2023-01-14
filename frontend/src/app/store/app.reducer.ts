import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from './auth/auth.reducer';
import * as fromNotification from '../shared/snackbar/store/snackbar.reducer';
import * as fromChart from 'app/modules/admin/dashboard/store/chart/chart.reducer';
import * as fromNotes from 'app/modules/admin/dashboard/store/notes/notes.reducer';

export interface AppState {
    auth: fromAuth.State,
    notification: fromNotification.State,
    chart: fromChart.State,
    notes: fromNotes.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.AuthReducer,
    notification: fromNotification.NotificationReducer,
    chart: fromChart.chartReducer,
    notes: fromNotes.notesReducer,
};

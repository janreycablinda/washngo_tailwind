import { createAction, props } from '@ngrx/store';

export const snackbarSnackbars = createAction(
  '[Snackbar] Snackbar Snackbars'
);

export const notificationResponse = createAction(
  '[Notification] Load Notifications Failure',
  props<{ payload: any }>()
);

export const snackbarSnackbarsSuccess = createAction(
  '[Snackbar] Snackbar Snackbars Success',
  props<{ data: any }>()
);

export const snackbarSnackbarsFailure = createAction(
  '[Snackbar] Snackbar Snackbars Failure',
  props<{ error: any }>()
);

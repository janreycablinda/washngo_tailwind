import { createAction, props } from '@ngrx/store';
import { AuthCredential } from 'app/models/auth';
import { UserDTO } from 'app/models/users';

export const loginRequestedAction = createAction(
  '[Auth] Login Requested Action',
  props<{ payload: AuthCredential }>()
);

export const loginSucceededAction = createAction(
  '[Auth] Login Succeeded Action',
  props<{ payload: any }>()
);

export const authLogoutRequestedAction = createAction(
  '[Auth] Auto Logout Requested Action'
);

export const authLogoutSucceededAction = createAction(
  '[Auth] Auto Logout Succeeded Action'
);

export const autoLoginRequestedAction = createAction(
  '[Auth] Auto Login Requested Action'
);

export const autoLoginSucceededAction = createAction(
  '[Auth] Auto Login Succeeded Action',
  props<{ payload: any }>()
);

export const getUserDataRequestedAction = createAction(
  '[Auth] Get User Data Requested Action',
  props<{ payload: any }>()
);

export const getUserDataSucceededAction = createAction(
  '[Auth] Get User Data Succeeded Action',
  props<{ payload: any }>()
);

export const authAuthsSuccess = createAction(
  '[Auth] Auth Auths Success',
  props<{ data: any }>()
);

export const authAuthsFailure = createAction(
  '[Auth] Auth Auths Failure',
  props<{ error: any }>()
);

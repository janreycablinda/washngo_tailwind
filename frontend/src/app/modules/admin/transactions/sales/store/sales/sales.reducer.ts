import { Action, createReducer, on } from '@ngrx/store';
import * as SalesActions from './sales.actions';

export const salesFeatureKey = 'sales';

export interface State {
  transactions: [],
  work_order: String,
}

export const initialState: State = {
  transactions: [],
  work_order: ''
};

export const reducer = createReducer(
  initialState,
  on(SalesActions.loadSalesSucceededAction, (state: State, { payload }) =>
  {
    return {
      ...state,
      transactions: payload
    }
  }),
  on(SalesActions.loadWorkOrderSucceededAction, (state: State, { payload }) =>
  {
    console.log(payload);
    return {
      ...state,
      work_order: payload
    }
  }),
  // on(SalesActions.addSaleSucceededAction, (state: State, { payload }) =>
  // {
  //   console.log(payload);
  //   return {
  //     ...state,
  //     transactions: [...state.transactions, payload]
  //   }
  // }),
  //reference
  // on(UserActions.addUserSucceededAction, (state: State, { payload }) =>
  // {
  //   return {
  //     ...state,
  //     users: [...state.users, payload]
  //   }
  // }),
  // on(UserActions.updateUserSucceededAction, (state: State, { payload }) =>
  // {
  //   const updateUser = state.users.map((role)=> {
  //     return role.id === payload.id ? payload : role;
  //   })
  //   return {
  //     ...state,
  //     users: updateUser
  //   }
  // }),
  // on(UserActions.deleteUserSucceededAction, (state: State, { id }) =>
  // {
  //   console.log(id);
  //   let newData = state.users.filter(item => item.id !== id);
  //   return {
  //     ...state,
  //     users: newData
  //   }
  // })
);

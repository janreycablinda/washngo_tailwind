import { createAction, props } from '@ngrx/store';

export const loadSalesSeriesRequestedtAction = createAction(
    '[Chart] Load Sales Series Requested Action',
    props<{ year: any }>()
);

export const loadSalesSeriesSucceededAction = createAction(
    '[Chart] Load Sales Series Succeeded Action',
    props<{ payload: any }>()
);

export const loadSalesSeriesFailedAction = createAction(
    '[Chart] Load Sales Series Failed Action',
    props<{ error: any }>()
);

export const loadTargetSalesSeriesRequestedtAction = createAction(
    '[Chart] Load Target Sales Series Requested Action',
    props<{ branchId: any }>()
);

export const loadTargetSalesSeriesSucceededAction = createAction(
    '[Chart] Load Target Sales Series Succeeded Action',
    props<{ payload: any }>()
);

export const loadTargetSalesSeriesFailedAction = createAction(
    '[Chart] Load Target Sales Series Failed Action',
    props<{ error: any }>()
);

export const updateTargetSalesSeriesRequestedtAction = createAction(
    '[Chart] Update Target Sales Series Requested Action',
    props<{ payload: any }>()
);

export const updateTargetSalesSeriesSucceededAction = createAction(
    '[Chart] Update Target Sales Series Succeeded Action',
    props<{ payload: any }>()
);

// export const loadTargetSalesSeriesFailedAction = createAction(
//     '[Chart] Update Target Sales Series Failed Action',
//     props<{ error: any }>()
// );

export const loadSalesRequestedtAction = createAction(
    '[Chart] Load Sales Requested Action',
    props<{ payload: any }>()
);

export const loadSalesSucceededAction = createAction(
    '[Chart] Load Sales Succeeded Action',
    props<{ payload: any }>()
);

export const loadSalesFailedAction = createAction(
    '[Chart] Load Sales Failed Action',
    props<{ error: any }>()
);

export const loadExpensesRequestedtAction = createAction(
    '[Chart] Load Expenses Requested Action',
    props<{ payload: any }>()
);

export const loadExpensesSucceededAction = createAction(
    '[Chart] Load Expenses Succeeded Action',
    props<{ payload: any }>()
);

export const loadMembersRequestedtAction = createAction(
    '[Chart] Load Members Requested Action',
    props<{ payload: any }>()
);

export const loadMembersSucceededAction = createAction(
    '[Chart] Load Members Succeeded Action',
    props<{ payload: any }>()
);

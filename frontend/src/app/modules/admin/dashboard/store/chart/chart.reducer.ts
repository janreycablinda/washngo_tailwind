import { createReducer, on } from '@ngrx/store';
import * as ChartActions from './chart.actions';
import { ChartOptions } from 'app/models/chart-options';

export const chartFeatureKey = 'chart';

export interface State {
    salesSeries: object[];
    salesTargetSeries: object;

    salesCounts: {
        "today": number;
        "week": number;
        "month": number;
    };

    //
    error: any;
}

export const initialState: State = {
    salesSeries: [],
    salesTargetSeries: null,

    salesCounts: {
        "today": null,
        "week": null,
        "month": null,
    },

    //
    error: null,

};

export const chartReducer = createReducer(
    initialState,
    on(ChartActions.loadSalesSeriesSucceededAction, (state: State, { payload }) => {
        return {
            ...state,
            salesSeries: payload,

        }
    }),
    on(ChartActions.loadSalesSeriesFailedAction, (state: State, { error }) => {
        return {
            ...state,
            error: error,

        }
    }),
    on(ChartActions.loadTargetSalesSeriesSucceededAction, (state: State, { payload }) => {
        return {
            ...state,
            salesTargetSeries: payload,

        }
    }),

    //
    on(ChartActions.updateTargetSalesSeriesRequestedtAction, (state: State, { payload }) => {
        // console.log('updateTargetSalesSeriesRequestedtAction', payload);
        return {
            ...state,
            salesTargetSeries: payload["form"],
        }
    }),

    on(ChartActions.loadSalesRequestedtAction, (state: State, { payload }) => {
        return {
            ...state,
        }
    }),

    on(ChartActions.loadSalesSucceededAction, (state: State, { payload }) => {

        console.log('loadSalesSucceededAction', payload);
        // console.log('loadSalesSucceededAction', payload["payload"]["data"]);

        switch (payload["payload"]["data"]) {
            case "Today":

                console.log("switch Today state count today", state["salesCounts"]["today"]);
                console.log("switch Today", payload["payload"]["data"]);

                if (state["salesCounts"]["today"] !== null) {
                    break;
                }

                const todaySum = payload["data"].reduce((total, item) => {
                    if (item.payment) {
                        return total + parseFloat(item.payment.total);
                    } else {
                        return total;
                    }
                }, 0);
                // console.log("todaySum", todaySum);

                return {
                    ...state,
                    salesCounts: {
                        ...state.salesCounts,
                        today: todaySum,

                    },
                };

            case "Week":

                console.log("switch Week state count week", state["salesCounts"]["week"]);
                console.log("switch Week", payload["data"]);

                if (state["salesCounts"]["week"] !== null) {
                    console.log(`state["salesCounts"]["week"] === null`)
                    break;
                }

                const weekSum = payload["data"].reduce((total, item) => {
                    if (item.payment) {
                        return total + parseFloat(item.payment.total);
                    } else {
                        return total;
                    }
                }, 0);
                // console.log("weekSum", weekSum);

                return {
                    ...state,
                    salesCounts: {
                        ...state.salesCounts,
                        week: weekSum,

                    },
                }

            case "Month":

                console.log("switch Month state count month", state["salesCounts"]["month"]);
                console.log("switch Month", payload["data"]);

                if (state["salesCounts"]["month"] !== null) {
                    console.log(`state["salesCounts"]["month"] === null`)
                    break;
                }

                const monthSum = payload["data"].reduce((total, item) => {
                    if (item.payment) {
                        return total + parseFloat(item.payment.total);
                    } else {
                        return total;
                    }
                }, 0);
                // console.log("monthSum", monthSum);

                return {
                    ...state,
                    salesCounts: {
                        ...state.salesCounts,
                        month: monthSum,

                    },
                }

            default:
                break;
        }

        return {
            ...state,
        }
    }),

);

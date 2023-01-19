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

    expensesCounts: {
        "today": number;
        "week": number;
        "month": number;
    };

    membersCounts: {
        "all": number;
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

    expensesCounts: {
        "today": null,
        "week": null,
        "month": null,
    },

    membersCounts: {
        "all": null,
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

        // console.log('loadSalesSucceededAction', payload);
        // console.log('loadSalesSucceededAction', payload["payload"]["data"]);

        switch (payload["payload"]["data"]) {
            case "Today":

                // console.log("switch Today state count today", state["salesCounts"]["today"]);
                // console.log("switch Today", payload["payload"]["data"]);

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

    on(ChartActions.loadExpensesRequestedtAction, (state: State, { payload }) => {
        // console.log('loadExpensesRequestedtAction payload', payload)
        return {
            ...state,
        }
    }),

    on(ChartActions.loadExpensesSucceededAction, (state: State, { payload }) => {
        // console.log('loadExpensesSucceededAction payload', payload)
        return {
            ...state,

        }
    }),

    on(ChartActions.loadMembersRequestedtAction, (state: State, { payload }) => {
        // console.log('loadMembersRequestedtAction payload', payload)
        return {
            ...state,
        }
    }),

    on(ChartActions.loadMembersSucceededAction, (state: State, { payload }) => {
        // console.log('loadMembersSucceededAction payload', payload)

        // console.log('loadMembersSucceededAction', payload["payload"]["data"]);

        switch (payload["payload"]["data"]) {
            case "All":

                // console.log("switch membersCounts state count all", state["membersCounts"]["all"]);
                // console.log("switch All", payload["payload"]["data"]);

                if (state["membersCounts"]["all"] !== null) {
                    break;
                }

                const allSum : number = payload["data"].length > 0 ? payload["data"].length : 0;
                // console.log("allSum", allSum);

                return {
                    ...state,
                    membersCounts: {
                        ...state.membersCounts,
                        all: allSum,
                    },
                };
            case "Today":

                console.log("switch Today state count today", state["membersCounts"]["today"]);
                console.log("switch Today", payload["payload"]["data"]);

                if (state["membersCounts"]["today"] !== null) {
                    break;
                }

                const todaySum : number = payload["data"].length > 0 ? payload["data"].length : 0;
                console.log("todaySum", todaySum);

                return {
                    ...state,
                    membersCounts: {
                        ...state.membersCounts,
                        today: todaySum,
                    },
                };

            case "Week":

                console.log("switch Week state count week", state["membersCounts"]["week"]);
                console.log("switch Week", payload["payload"]["data"]);

                if (state["membersCounts"]["week"] !== null) {
                    break;
                }

                const weekSum : number = payload["data"].length > 0 ? payload["data"].length : 0;
                console.log("weekSum", weekSum);

                return {
                    ...state,
                    membersCounts: {
                        ...state.membersCounts,
                        week: weekSum,
                    },
                };

            case "Month":

                console.log("switch Month state count month", state["membersCounts"]["month"]);
                console.log("switch Month", payload["data"]);

                if (state["membersCounts"]["month"] !== null) {
                    break;
                }

                const monthSum : number = payload["data"].length > 0 ? payload["data"].length : 0;
                console.log("monthSum", monthSum);

                return {
                    ...state,
                    membersCounts: {
                        ...state.membersCounts,
                        month: monthSum,
                    },
                };

            default:
                break;
        }

        return {
            ...state,
        }
    }),

);

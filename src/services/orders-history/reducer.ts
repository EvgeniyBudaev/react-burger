import { Reducer } from "redux";
import { ActionTypes, TOrdersHistoryActions } from "services/orders-history";
import { TFeed } from "types/feed";

interface IOrdersHistoryState {
    wsOrdersHistoryRequest: boolean;
    wsOrdersHistoryConnected: boolean;
    ordersHistory: TFeed | null;
    ordersHistoryRequest: boolean;
    ordersHistoryFailed: boolean;
    error: Event | null;
}

const initialState: IOrdersHistoryState = {
    wsOrdersHistoryRequest: false,
    wsOrdersHistoryConnected: false,
    ordersHistory: null,
    ordersHistoryRequest: false,
    ordersHistoryFailed: false,
    error: null,
};

export const reducer: Reducer<IOrdersHistoryState, TOrdersHistoryActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionTypes.WS_ORDERS_HISTORY_CONNECTION_START: {
            return {
                ...state,
                wsOrdersHistoryRequest: true,
                error: null,
            };
        }
        case ActionTypes.WS_ORDERS_HISTORY_CONNECTION_STOP: {
            return {
                ...state,
                wsOrdersHistoryConnected: false,
            };
        }
        case ActionTypes.WS_ORDERS_HISTORY_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsOrdersHistoryConnected: true,
                error: null,
            };
        }
        case ActionTypes.WS_ORDERS_HISTORY_CONNECTION_ERROR: {
            return {
                ...state,
                wsOrdersHistoryRequest: false,
                error: action.payload,
            };
        }
        case ActionTypes.WS_ORDERS_HISTORY_CONNECTION_CLOSED: {
            return {
                ...state,
                wsOrdersHistoryConnected: false,
                error: null,
            };
        }
        case ActionTypes.WS_GET_ORDERS_HISTORY: {
            return {
                ...state,
                wsOrdersHistoryRequest: false,
                ordersHistory: {
                    ...state.ordersHistory,
                    orders: action.payload.orders,
                    success: true,
                    total: action.payload.total,
                    totalToday: action.payload.totalToday,
                },
            };
        }
        default:
            return state;
    }
};

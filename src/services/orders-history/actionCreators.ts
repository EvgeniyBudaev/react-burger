import { TFeed } from "types/feed";
import { ActionTypes } from "./actionTypes";
import {
    IWsOrdersHistoryConnectionClosedAction,
    IWsOrdersHistoryConnectionErrorAction,
    IWsOrdersHistoryConnectionStartAction,
    IWsOrdersHistoryConnectionStopAction,
    IWsOrdersHistoryConnectionSuccessAction,
    IWsGetOrdersHistoryAction,
} from "./types";

export const wsOrdersHistoryConnectionStartAction =
    (): IWsOrdersHistoryConnectionStartAction => ({
        type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_START,
    });

export const wsOrdersHistoryConnectionStopAction =
    (): IWsOrdersHistoryConnectionStopAction => ({
        type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_STOP,
    });

export const wsOrdersHistoryConnectionSuccessAction =
    (): IWsOrdersHistoryConnectionSuccessAction => ({
        type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_SUCCESS,
    });

export const wsOrdersHistoryConnectionErrorAction = (
    error: Event
): IWsOrdersHistoryConnectionErrorAction => ({
    type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_ERROR,
    payload: error,
});

export const wsOrdersHistoryConnectionClosedAction =
    (): IWsOrdersHistoryConnectionClosedAction => ({
        type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_CLOSED,
    });

export const wsGetOrdersHistoryAction = (
    data: TFeed
): IWsGetOrdersHistoryAction => ({
    type: ActionTypes.WS_GET_ORDERS_HISTORY,
    payload: data,
});

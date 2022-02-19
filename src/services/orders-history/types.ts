import { TWsOrdersHistoryActions } from "services/types";
import { TFeed } from "types/feed";
import { ActionTypes } from "./actionTypes";

export const wsOrdersHistoryActions: TWsOrdersHistoryActions = {
    wsInit: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_START,
    onOpen: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_SUCCESS,
    wsStop: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_STOP,
    onClose: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_CLOSED,
    onError: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_ERROR,
    onMessage: ActionTypes.WS_GET_ORDERS_HISTORY,
};

export interface IWsOrdersHistoryConnectionStartAction {
    type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_START;
}

export interface IWsOrdersHistoryConnectionStopAction {
    type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_STOP;
}

export interface IWsOrdersHistoryConnectionSuccessAction {
    type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_SUCCESS;
}

export interface IWsOrdersHistoryConnectionErrorAction {
    type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_ERROR;
    payload: Event;
}

export interface IWsOrdersHistoryConnectionClosedAction {
    type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_CLOSED;
}

export interface IWsGetOrdersHistoryAction {
    type: ActionTypes.WS_GET_ORDERS_HISTORY;
    payload: TFeed;
}

export type TOrdersHistoryActions =
    | IWsOrdersHistoryConnectionStartAction
    | IWsOrdersHistoryConnectionStopAction
    | IWsOrdersHistoryConnectionSuccessAction
    | IWsOrdersHistoryConnectionErrorAction
    | IWsOrdersHistoryConnectionClosedAction
    | IWsGetOrdersHistoryAction;

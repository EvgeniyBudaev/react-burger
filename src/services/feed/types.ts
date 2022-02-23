import { TWsFeedActions } from "services/types";
import { TFeed } from "types/feed";
import { ActionTypes } from "./actionTypes";

export const wsFeedActions: TWsFeedActions = {
    wsInit: ActionTypes.WS_FEED_CONNECTION_START,
    onOpen: ActionTypes.WS_FEED_CONNECTION_SUCCESS,
    wsStop: ActionTypes.WS_FEED_CONNECTION_STOP,
    onClose: ActionTypes.WS_FEED_CONNECTION_CLOSED,
    onError: ActionTypes.WS_FEED_CONNECTION_ERROR,
    onMessage: ActionTypes.WS_GET_FEED,
};

export interface IWsFeedConnectionStartAction {
    type: ActionTypes.WS_FEED_CONNECTION_START;
}

export interface IWsFeedConnectionStopAction {
    type: ActionTypes.WS_FEED_CONNECTION_STOP;
}

export interface IWsFeedConnectionSuccessAction {
    type: ActionTypes.WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionErrorAction {
    type: ActionTypes.WS_FEED_CONNECTION_ERROR;
    payload: Event;
}

export interface IWsFeedConnectionClosedAction {
    type: ActionTypes.WS_FEED_CONNECTION_CLOSED;
}

export interface IWsGetFeedAction {
    type: ActionTypes.WS_GET_FEED;
    payload: TFeed;
}

export type TFeedActions =
    | IWsFeedConnectionStartAction
    | IWsFeedConnectionStopAction
    | IWsFeedConnectionSuccessAction
    | IWsFeedConnectionErrorAction
    | IWsFeedConnectionClosedAction
    | IWsGetFeedAction;

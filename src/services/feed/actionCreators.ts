import { TFeed } from "types/feed";
import { ActionTypes } from "./actionTypes";
import {
    IWsFeedConnectionClosedAction,
    IWsFeedConnectionErrorAction,
    IWsFeedConnectionStartAction,
    IWsFeedConnectionStopAction,
    IWsFeedConnectionSuccessAction,
    IWsGetFeedAction,
} from "./types";

export const wsFeedConnectionStartAction =
    (): IWsFeedConnectionStartAction => ({
        type: ActionTypes.WS_FEED_CONNECTION_START,
    });

export const wsFeedConnectionStopAction = (): IWsFeedConnectionStopAction => ({
    type: ActionTypes.WS_FEED_CONNECTION_STOP,
});

export const wsFeedConnectionSuccessAction =
    (): IWsFeedConnectionSuccessAction => ({
        type: ActionTypes.WS_FEED_CONNECTION_SUCCESS,
    });

export const wsFeedConnectionErrorAction = (
    error: Event
): IWsFeedConnectionErrorAction => ({
    type: ActionTypes.WS_FEED_CONNECTION_ERROR,
    payload: error,
});

export const wsFeedConnectionClosedAction =
    (): IWsFeedConnectionClosedAction => ({
        type: ActionTypes.WS_FEED_CONNECTION_CLOSED,
    });

export const wsGetFeedAction = (feedData: TFeed): IWsGetFeedAction => ({
    type: ActionTypes.WS_GET_FEED,
    payload: feedData,
});

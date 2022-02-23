import { Reducer } from "redux";
import { ActionTypes, TFeedActions } from "services/feed";
import { TFeed } from "types/feed";

interface IFeedState {
    wsFeedRequest: boolean;
    wsFeedConnected: boolean;
    feed: TFeed | null;
    feedRequest: boolean;
    feedFailed: boolean;
    error: Event | null;
}

const initialState: IFeedState = {
    wsFeedRequest: false,
    wsFeedConnected: false,
    feed: null,
    feedRequest: false,
    feedFailed: false,
    error: null,
};

export const reducer: Reducer<IFeedState, TFeedActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionTypes.WS_FEED_CONNECTION_START: {
            return {
                ...state,
                wsFeedRequest: true,
                error: null,
            };
        }
        case ActionTypes.WS_FEED_CONNECTION_STOP: {
            return {
                ...state,
                wsFeedConnected: false,
            };
        }
        case ActionTypes.WS_FEED_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsFeedConnected: true,
                error: null,
            };
        }
        case ActionTypes.WS_FEED_CONNECTION_ERROR: {
            return {
                ...state,
                wsFeedRequest: false,
                error: action.payload,
            };
        }
        case ActionTypes.WS_FEED_CONNECTION_CLOSED: {
            return {
                ...state,
                wsFeedConnected: false,
                error: null,
            };
        }
        case ActionTypes.WS_GET_FEED: {
            return {
                ...state,
                wsFeedRequest: false,
                feed: {
                    ...state.feed,
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

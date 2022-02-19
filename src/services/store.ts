import { WS_FEED_URL, WS_URL_OWNER } from "constants/routes";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { wsFeedActions } from "services/feed";
import { socketMiddleware } from "services/middleware";
import { rootReducer } from "services/rootReducer";
import { wsOrdersHistoryActions } from "services/orders-history";

const middlewares = [
    thunk,
    socketMiddleware(WS_FEED_URL, wsFeedActions, false),
    socketMiddleware(WS_URL_OWNER, wsOrdersHistoryActions, true),
];

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

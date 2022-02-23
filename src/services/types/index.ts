import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { AccountActionsType } from "services/account";
import { BurgerConstructorActionsType } from "services/burger-constructor";
import { BurgerIngredientsActionsType } from "services/burger-ingredients";
import { ActionTypes as FeedActionTypes, TFeedActions } from "services/feed";
import { IngredientDetailsActionsType } from "services/ingredient-details";
import { OrderDetailsActionsType } from "services/order-details";
import {
    ActionTypes as OrderHistoryActionTypes,
    TOrdersHistoryActions,
} from "services/orders-history";
import { rootReducer } from "services/rootReducer";
import { store } from "services/store";

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
    | AccountActionsType
    | BurgerConstructorActionsType
    | BurgerIngredientsActionsType
    | IngredientDetailsActionsType
    | OrderDetailsActionsType
    | TFeedActions
    | TOrdersHistoryActions;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TWsFeedActions = {
    wsInit: typeof FeedActionTypes.WS_FEED_CONNECTION_START;
    wsStop: typeof FeedActionTypes.WS_FEED_CONNECTION_STOP;
    onOpen: typeof FeedActionTypes.WS_FEED_CONNECTION_SUCCESS;
    onClose: typeof FeedActionTypes.WS_FEED_CONNECTION_CLOSED;
    onError: typeof FeedActionTypes.WS_FEED_CONNECTION_ERROR;
    onMessage: typeof FeedActionTypes.WS_GET_FEED;
};

export type TWsOrdersHistoryActions = {
    wsInit: typeof OrderHistoryActionTypes.WS_ORDERS_HISTORY_CONNECTION_START;
    wsStop: typeof OrderHistoryActionTypes.WS_ORDERS_HISTORY_CONNECTION_STOP;
    onOpen: typeof OrderHistoryActionTypes.WS_ORDERS_HISTORY_CONNECTION_SUCCESS;
    onClose: typeof OrderHistoryActionTypes.WS_ORDERS_HISTORY_CONNECTION_CLOSED;
    onError: typeof OrderHistoryActionTypes.WS_ORDERS_HISTORY_CONNECTION_ERROR;
    onMessage: typeof OrderHistoryActionTypes.WS_GET_ORDERS_HISTORY;
};

export type TWsActions = TWsFeedActions | TWsOrdersHistoryActions;

export type TFuncVoid = () => void;

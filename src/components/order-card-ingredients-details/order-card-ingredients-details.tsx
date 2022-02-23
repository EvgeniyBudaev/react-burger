import React, { useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import isNull from "lodash/isNull";
import { useDispatch, useSelector } from "hooks";
import { ROUTES } from "routes";
import {
    wsFeedConnectionStartAction,
    wsFeedConnectionStopAction,
} from "services/feed";
import {
    wsOrdersHistoryConnectionStartAction,
    wsOrdersHistoryConnectionStopAction,
} from "services/orders-history";
import { feedSelector, ordersHistorySelector } from "services/selectors";
import { IOrder } from "types/order";
import { Spinner } from "ui-kit";
import { OrderCard } from "./order-card/order-card";

export const OrderCardIngredientsDetails: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const isProfile = !!useRouteMatch(ROUTES.PROFILE);
    const feedData = useSelector(feedSelector);
    const ordersHistoryData = useSelector(ordersHistorySelector);
    const { feed, wsFeedConnected } = feedData;
    const { ordersHistory, wsOrdersHistoryConnected } = ordersHistoryData;

    const order = isProfile
        ? ordersHistory &&
          ordersHistory.orders &&
          (ordersHistory.orders.find((i: IOrder) => i._id === id) as IOrder)
        : feed &&
          feed.orders &&
          (feed.orders.find((i: IOrder) => i._id === id) as IOrder);

    useEffect(() => {
        if (isProfile) {
            dispatch(wsOrdersHistoryConnectionStartAction());
            return () => {
                dispatch(wsOrdersHistoryConnectionStopAction());
            };
        } else {
            dispatch(wsFeedConnectionStartAction());
            return () => {
                dispatch(wsFeedConnectionStopAction());
            };
        }
    }, [dispatch, isProfile]);

    return !isNull(order) && (!wsFeedConnected || !wsOrdersHistoryConnected) ? (
        <OrderCard order={order} />
    ) : (
        <Spinner />
    );
};

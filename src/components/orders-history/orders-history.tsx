import React, { useEffect } from "react";
import { OrderIngredients } from "components";
import { useDispatch, useSelector } from "hooks";
import {
    wsOrdersHistoryConnectionStartAction,
    wsOrdersHistoryConnectionStopAction,
} from "services/orders-history";
import { ordersHistorySelector } from "services/selectors";
import { Spinner } from "ui-kit";
import classes from "./orders-history.module.css";

export const OrdersHistory: React.FC = () => {
    const dispatch = useDispatch();
    const { ordersHistory, wsOrdersHistoryRequest } = useSelector(
        ordersHistorySelector
    );
    const orders = ordersHistory && ordersHistory.orders;

    useEffect(() => {
        dispatch(wsOrdersHistoryConnectionStartAction());
        return () => {
            dispatch(wsOrdersHistoryConnectionStopAction());
        };
    }, [dispatch]);

    if (wsOrdersHistoryRequest) return <Spinner />;

    return (
        <section className={classes.section}>
            <OrderIngredients orders={orders} />
        </section>
    );
};

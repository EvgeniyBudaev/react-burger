import React, { useEffect } from "react";
import cn from "classnames";
import { Layout, OrdersBoard, OrderIngredients } from "components";
import { useDispatch, useSelector } from "hooks";
import {
    wsFeedConnectionStartAction,
    wsFeedConnectionStopAction,
} from "services/feed";
import { feedSelector } from "services/selectors";
import { Spinner } from "ui-kit";
import classes from "./feed-page.module.css";

export const FeedPage: React.FC = () => {
    const dispatch = useDispatch();
    const { feed, wsFeedRequest } = useSelector(feedSelector);
    const orders = feed && feed.orders;

    useEffect(() => {
        dispatch(wsFeedConnectionStartAction());
        return () => {
            dispatch(wsFeedConnectionStopAction());
        };
    }, [dispatch]);

    if (wsFeedRequest) return <Spinner />;

    return (
        <Layout>
            <section className={cn("mb-10 mt-10", classes.FeedPage)}>
                <h1 className="text text_type_main-large mb-5">
                    Лента заказов
                </h1>
                <div className={classes.Inner}>
                    <OrderIngredients orders={orders} />
                    <OrdersBoard data={feed} />
                </div>
            </section>
        </Layout>
    );
};

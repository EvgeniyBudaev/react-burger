import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import cn from "classnames";
import { TFeed } from "types/feed";
import { getOrderNumbers } from "utils/common";
import classes from "./orders-board.module.css";

export interface IOrdersBoardProps {
    data?: TFeed | null;
}

export const OrdersBoard: React.FC<IOrdersBoardProps> = ({ data }) => {
    const [done, setDone] = useState<number[]>([]);
    const [pending, setPending] = useState<number[]>([]);

    useEffect(() => {
        if (!isNil(data)) {
            const { done, pending } = getOrderNumbers(data.orders);
            setDone(done);
            setPending(pending);
        }
    }, [data]);

    return (
        <section className={cn(classes.OrdersBoard)}>
            <div className={classes.BoardContainer}>
                <div className="mr-9">
                    <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                    <ul className={classes.List}>
                        {!isNil(done) &&
                            done.map((item: number, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className={`text text_type_digits-default ${classes.ListItem}`}
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div>
                    <h3 className="text text_type_main-medium mb-6">
                        В работе:
                    </h3>
                    <ul className={classes.List}>
                        {!isNil(pending) &&
                            pending.map((item: number, index: number) => {
                                return (
                                    <li
                                        key={index}
                                        className={`text text_type_digits-default`}
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
            <div className="mt-15 mb-15">
                <h3 className="text text_type_main-medium">
                    Выполнено за все время:
                </h3>
                <span
                    className={`text text_type_digits-large ${classes.NumberOrder}`}
                >
                    {data && data.total}
                </span>
            </div>
            <div>
                <h3 className="text text_type_main-medium">
                    Выполнено за сегодня:
                </h3>
                <span
                    className={`text text_type_digits-large ${classes.NumberOrder}`}
                >
                    {data && data.totalToday}
                </span>
            </div>
        </section>
    );
};

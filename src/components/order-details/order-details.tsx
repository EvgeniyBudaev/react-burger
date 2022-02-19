import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useSelector } from "hooks";
import { orderDetailsSelector } from "services/selectors";
import { Icon } from "ui-kit";
import classes from "./order-details.module.css";

export const OrderDetails: React.FC = () => {
    const [counter, setCounter] = useState(15);
    const orderDetails = useSelector(orderDetailsSelector);
    const orderNumber = orderDetails.details.order.number;

    useEffect(() => {
        let timer: number;
        if (counter > 0) {
            timer = window.setTimeout(
                () => setCounter(counter => counter - 1),
                1000
            );
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [counter]);

    return (
        <section className={cn("mb-10", classes.OrderDetails)}>
            <div className={cn("center_on_width", classes.Container)}>
                {counter > 0 && (
                    <h3
                        className={`mt-4 text text_type_digits-large ${classes.OrderNumber}`}
                    >
                        {counter}
                    </h3>
                )}
                {orderNumber && (
                    <h3
                        className={`mt-4 text text_type_digits-large ${classes.OrderNumber}`}
                    >
                        {orderNumber}
                    </h3>
                )}
                <p className="text text_type_main-medium mb-15">
                    {orderNumber
                        ? "идентификатор заказа"
                        : "до готовности заказа"}
                </p>
                <div className={cn("mb-10", classes.OrderDetailsIcon)}>
                    <Icon type="Done" />
                </div>
                <p className="text text_type_main-default mb-2">
                    {orderNumber
                        ? "Ваш заказ готов"
                        : "Ваш заказ начали готовить"}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    {orderNumber
                        ? "Заберите ваш заказ на орбитальной станции"
                        : "Дождитесь готовности на орбитальной станции"}
                </p>
            </div>
        </section>
    );
};

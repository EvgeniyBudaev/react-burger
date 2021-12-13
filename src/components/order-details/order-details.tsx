import React from "react";
import cn from "classnames";
import { IOrderDetails } from "types/order";
import { Icon } from "ui-kit";
import classes from "./order-details.module.css";

export interface IOrderDetailsProps {
    orderDetails: IOrderDetails;
}

export const OrderDetails: React.FC<IOrderDetailsProps> = ({
    orderDetails,
}) => {
    return (
        <section className={cn("mb-10", classes.OrderDetails)}>
            <div className={cn("center_on_width", classes.Container)}>
                <p className="text text_type_digits-large mb-8 mt-10">
                    {orderDetails.order.number}
                </p>
                <p className="text text_type_main-medium mb-15">
                    идентификатор заказа
                </p>
                <div className={cn("mb-10", classes.OrderDetailsIcon)}>
                    <Icon type="Done" />
                </div>
                <p className="text text_type_main-default mb-2">
                    {orderDetails.success
                        ? "Ваш заказ готов"
                        : "Ваш заказ начали готовить"}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    {orderDetails.success
                        ? "Заберите ваш заказ на орбитальной станции"
                        : "Дождитесь готовности на орбитальной станции"}
                </p>
            </div>
        </section>
    );
};

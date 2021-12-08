import React from "react";
import cn from "classnames";
import { Icon } from "ui-kit";
import classes from "./order-details.module.css";

export const OrderDetails: React.FC = () => {
    return (
        <section className={cn("mb-10", classes.OrderDetails)}>
            <div className={cn("center_on_width", classes.Container)}>
                <p className="text text_type_digits-large mb-8 mt-10">034536</p>
                <p className="text text_type_main-medium mb-15">
                    идентификатор заказа
                </p>
                <div className={cn("mb-10", classes.OrderDetailsIcon)}>
                    <Icon type="Done" />
                </div>
                <p className="text text_type_main-default mb-2">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </section>
    );
};

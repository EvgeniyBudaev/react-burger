import React from "react";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { BurgerConstructor } from "components";
import classes from "./order.module.css";

export const Order: React.FC = () => {
    return (
        <section className={cn("mb-10 mt-25 pr-2 pl-2", classes.Order)}>
            <BurgerConstructor />
            <div className={classes.Control}>
                <div className={classes.TotalPrice}>
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

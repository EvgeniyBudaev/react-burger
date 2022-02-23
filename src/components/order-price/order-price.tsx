import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classes from "./order-price.module.css";

export interface IPriceProps {
    price: string | number | null;
}

export const OrderPrice: FC<IPriceProps> = ({ price }) => {
    return (
        <div className={classes.OrderPrice}>
            <span className="text text_type_digits-default">{price}</span>
            <CurrencyIcon type="primary" />
        </div>
    );
};

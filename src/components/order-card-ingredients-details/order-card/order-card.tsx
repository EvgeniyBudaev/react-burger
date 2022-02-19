import React from "react";
import { OrderIngredient, OrderPrice, OrderTime } from "components";
import { useSelector } from "hooks";
import { burgerIngredientsSelector } from "services/selectors";
import { IIngredient } from "types/ingredient";
import { IOrder } from "types/order";
import {
    getOrderIngredients,
    getOrderPrice,
    getQuantityIngredients,
} from "utils/common";
import { getOrderDate } from "utils/date";
import { getOrderStatus } from "utils/status";
import classes from "./order-card.module.css";

export interface IOrderCardProps {
    order: IOrder;
}

export const OrderCard: React.FC<IOrderCardProps> = ({ order }) => {
    const burgerIngredients = useSelector(burgerIngredientsSelector);
    const allIngredients = burgerIngredients.ingredients;

    const timeOrder = order && getOrderDate(order);
    const numberOfIngredients = getQuantityIngredients(order.ingredients);
    const orderIngredients = getOrderIngredients(
        Object.keys(numberOfIngredients),
        allIngredients
    ).slice(0, 6);
    const quantity: Array<number> = Object.values(numberOfIngredients);
    const price = getOrderPrice(
        getOrderIngredients(order.ingredients, allIngredients)
    );
    const status = order.status && getOrderStatus(order.status, classes);

    return (
        <section className={classes.OrderCard}>
            <span
                className={`text text_type_digits-default mb-10 ${classes.OrderNumber}`}
            >
                #{order.number}
            </span>
            <h3 className="text text_type_main-medium mb-3">{order.name}</h3>
            <span
                className={`text text_type_main-default mb-8 ${
                    status && status.colorStatus
                }`}
            >
                {status && status.nameStatus}
            </span>
            <p className="text text_type_main-medium mb-4">Состав:</p>
            <ul className={classes.List}>
                {orderIngredients.map(
                    (ingredient: IIngredient, index: number) => {
                        return (
                            <li key={index}>
                                <OrderIngredient
                                    ingredient={ingredient}
                                    quantity={quantity[index]}
                                />
                            </li>
                        );
                    }
                )}
            </ul>
            <div className={classes.TotalPrice}>
                {timeOrder && <OrderTime time={timeOrder} />}
                <OrderPrice price={price} />
            </div>
        </section>
    );
};

import React from "react";
import { OrderCardIngredients } from "components";
import { IOrder } from "types/order";
import classes from "./order-ingredients.module.css";

export interface IOrderIngredientsProps {
    orders?: IOrder[] | null;
}

export const OrderIngredients: React.FC<IOrderIngredientsProps> = ({
    orders,
}) => {
    return (
        <section className={classes.OrderIngredients}>
            <div>
                <ul className={classes.List}>
                    {orders &&
                        orders.map((order: IOrder) => {
                            return (
                                <li key={order._id}>
                                    <OrderCardIngredients
                                        number={order.number}
                                        name={order.name}
                                        ingredients={order.ingredients}
                                        order={order}
                                    />
                                </li>
                            );
                        })}
                </ul>
            </div>
        </section>
    );
};

import React from "react";
import { Link, useLocation } from "react-router-dom";
import cn from "classnames";
import { OrderPrice, OrderTime } from "components";
import { useSelector } from "hooks";
import { burgerIngredientsSelector } from "services/selectors";
import { IOrder } from "types/order";
import { IIngredient } from "types/ingredient";
import { getOrderIngredients, getOrderPrice } from "utils/common";
import { getOrderDate } from "utils/date";
import { getOrderStatus } from "utils/status";
import classes from "./order-card-ingredients.module.css";

export interface IOrderCardIngredientsProps {
    name: string;
    number?: number;
    ingredients: string[];
    status?: string;
    order: IOrder;
}

export const OrderCardIngredients: React.FC<IOrderCardIngredientsProps> = ({
    name,
    number,
    ingredients,
    status,
    order,
}) => {
    const location = useLocation();
    const burgerIngredients = useSelector(burgerIngredientsSelector);
    const allIngredients = burgerIngredients.ingredients;
    const orderIngredients = getOrderIngredients(
        ingredients,
        allIngredients
    ).slice(0, 6);
    const countIngredients = ingredients.length - 6;
    const pathName =
        location.pathname === "/feed"
            ? `/feed/${order?._id}`
            : `/profile/orders/${order._id}`;
    const orderStatus = status ? getOrderStatus(status, classes) : null;
    const price = getOrderPrice(
        getOrderIngredients(order.ingredients, allIngredients)
    );
    const timeOrder = getOrderDate(order);

    return (
        <Link
            className={classes.Link}
            to={{ pathname: pathName, state: { modal: location } }}
        >
            <section className={cn("p-6 mr-2 mb-4", classes.Section)}>
                <div className={cn("mb-6", classes.OrderTime)}>
                    <span className="text text_type_digits-default">{`#${number}`}</span>
                    <OrderTime time={timeOrder} />
                </div>
                <div className="mb-6">
                    <h3 className="text text_type_main-medium">{name}</h3>
                    {status && (
                        <p
                            className={`text text_type_main-default mt-2 ${orderStatus?.colorStatus}`}
                        >
                            {orderStatus?.nameStatus}
                        </p>
                    )}
                </div>
                <div className={classes.ContainerOrderImg}>
                    <ul className={cn("p-0", classes.List)}>
                        {orderIngredients.map(
                            (item: IIngredient, index: number) => {
                                const zIndex = 6 - index;
                                return (
                                    <li
                                        className={classes.ListItem}
                                        key={index}
                                        style={{ zIndex }}
                                    >
                                        <img
                                            className={classes.Image}
                                            alt={item.name}
                                            src={item.image_large}
                                        />
                                    </li>
                                );
                            }
                        )}
                        {ingredients.length > 6 && (
                            <div className={classes.Overlay}>
                                &nbsp;
                                <span className="text text_type_main-default">{`+${countIngredients}`}</span>
                            </div>
                        )}
                    </ul>
                    <div className={cn("m-0", classes.ContainerPrice)}>
                        <OrderPrice price={price} />
                    </div>
                </div>
            </section>
        </Link>
    );
};

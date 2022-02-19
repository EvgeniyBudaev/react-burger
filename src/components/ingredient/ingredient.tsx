import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { useSelector } from "hooks";
import { ROUTES } from "routes";
import { burgerConstructorSelector } from "services/selectors";
import { IIngredient } from "types/ingredient";
import classes from "./ingredient.module.css";

export interface IIngredientProps {
    ingredient: IIngredient;
}

export const Ingredient: React.FC<IIngredientProps> = ({ ingredient }) => {
    const { _id, image, name, price, type } = ingredient;
    const [orderCount, setOrderCount] = useState(0);
    const { bun, mains } = useSelector(burgerConstructorSelector);
    const location = useLocation();

    useEffect(() => {
        const amountMains = mains.filter(
            ingredient => ingredient._id === _id
        ).length;
        const amountBun = bun._id === _id ? 2 : 0;
        type === INGREDIENT_TYPE.BUN
            ? setOrderCount(amountBun)
            : setOrderCount(amountMains);
    }, [mains, bun, _id, type]);

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: () => {
            return ingredient;
        },
    });

    return (
        <li className={classes.Ingredient} ref={dragRef}>
            <Link
                to={{
                    pathname: `${ROUTES.INGREDIENTS}/${_id}`,
                    state: { modal: location },
                }}
            >
                {orderCount >= 1 && (
                    <Counter count={orderCount} size="default" />
                )}
                <div className={cn("center_on_width", classes.Image)}>
                    <img src={image} alt={name} />
                </div>
                <div className={cn("mb-1 mt-1", classes.Price)}>
                    <p className="text text_type_digits-default mr-2">
                        {price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={cn("text text_type_main-default", classes.Title)}>
                    {name}
                </p>
            </Link>
        </li>
    );
};

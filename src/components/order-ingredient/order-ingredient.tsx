import React from "react";
import { IIngredient } from "types/ingredient";
import { OrderPrice } from "components";
import classes from "./order-ingredient.module.css";

export interface IOrderIngredientProps {
    ingredient: IIngredient;
    quantity: number;
}

export const OrderIngredient: React.FC<IOrderIngredientProps> = ({
    ingredient,
    quantity,
}) => {
    const ingredientPrice =
        ingredient.type === "bun"
            ? `2 x ${ingredient.price}`
            : `${quantity} x ${ingredient.price}`;

    return (
        <section className={classes.OrderIngredient}>
            <div className={classes.Inner}>
                <img
                    className={`mr-4 ${classes.Image}`}
                    alt={ingredient.name}
                    src={ingredient.image}
                />
                <span className="text text_type_main-default mr-4">
                    {ingredient.name}
                </span>
            </div>
            <div className={classes.Inner}>
                <OrderPrice price={ingredientPrice} />
            </div>
        </section>
    );
};

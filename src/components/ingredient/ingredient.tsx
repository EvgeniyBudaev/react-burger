import React from "react";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { IIngredient } from "types/ingredient";
import classes from "./ingredient.module.css";

export interface IIngredientProps {
    ingredient: IIngredient;
}

export const Ingredient: React.FC<IIngredientProps> = ({ ingredient }) => {
    const { image, name, price } = ingredient;

    return (
        <li className={classes.Ingredient}>
            <Counter count={1} size="default" />
            <div className={classes.Image}>
                <img src={image} alt="" />
            </div>
            <div className={cn("mb-1 mt-1", classes.Price)}>
                <p className="text text_type_digits-default mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={cn("text text_type_main-default", classes.Title)}>
                {name}
            </p>
        </li>
    );
};

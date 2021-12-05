import React from "react";
import {
    ConstructorElement as YaConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import classes from "./constructor-element.module.css";

type ConstructorElementType = "top" | "bottom";
type IngredientType = "bun" | "sauce" | "main";

export interface IConstructorElementProps {
    isLocked?: boolean;
    price: number;
    text: string;
    thumbnail: string;
    type?: ConstructorElementType;
    typeIngredient?: IngredientType;
}

export const ConstructorElement: React.FC<IConstructorElementProps> = ({
    isLocked,
    price,
    text,
    thumbnail,
    type,
    typeIngredient,
}) => {
    return (
        <li className={cn("mb-4", classes.ConstructorElement)}>
            {typeIngredient !== "bun" ? (
                <DragIcon type="primary" />
            ) : (
                <div className={classes.Empty} />
            )}
            <YaConstructorElement
                isLocked={isLocked}
                price={price}
                text={text}
                thumbnail={thumbnail}
                type={type}
            />
        </li>
    );
};

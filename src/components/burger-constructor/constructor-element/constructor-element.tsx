import React, { useRef } from "react";
import { ConstructorElement as YaConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import classes from "./constructor-element.module.css";

type ConstructorElementType = "top" | "bottom";

export interface IConstructorElementProps {
    _id?: string;
    isLocked?: boolean;
    price: number;
    text: string;
    thumbnail: string;
    type?: ConstructorElementType;
}

export const ConstructorElement: React.FC<IConstructorElementProps> = ({
    _id,
    isLocked,
    price,
    text,
    thumbnail,
    type,
}) => {
    const ref = useRef(null);

    return (
        <>
            <li className={cn("mb-4", classes.ConstructorElement)} ref={ref}>
                <div className={classes.Empty} />
                <YaConstructorElement
                    isLocked={isLocked}
                    price={price}
                    text={text}
                    thumbnail={thumbnail}
                    type={type}
                />
            </li>
        </>
    );
};

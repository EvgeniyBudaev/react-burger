import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    ConstructorElement as YaConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "routes";
import { deleteIngredient, moveIngredients } from "services/burger-constructor";
import { showIngredientDetails } from "services/ingredient-details";
import classes from "./constructor-element.module.css";

type ConstructorElementType = "top" | "bottom";

export interface IConstructorElementProps {
    calories?: number;
    carbohydrates?: number;
    fat?: number;
    image_large?: string;
    _id?: string;
    index?: number;
    isLocked?: boolean;
    name?: string;
    price: number;
    proteins?: number;
    text: string;
    thumbnail: string;
    type?: ConstructorElementType;
    typeIngredient?: string;
}

export const ConstructorElement: React.FC<IConstructorElementProps> = ({
    calories,
    carbohydrates,
    fat,
    image_large,
    _id,
    index,
    isLocked,
    name,
    price,
    proteins,
    text,
    thumbnail,
    type,
    typeIngredient,
}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef(null);

    const [, dragRef] = useDrag({
        type: "movingIngredient",
        item: { index: index },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: "movingIngredient",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        hover(item: { index: number }, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            hoverIndex && dispatch(moveIngredients(dragIndex, hoverIndex));
            if (hoverIndex != null) {
                item.index = hoverIndex;
            }
        },
    });

    dragRef(dropRef(ref));

    const handleIngredientDetailsOpen = () => {
        if (_id) {
            history.push(`${ROUTES.INGREDIENTS}/${_id}`);
            dispatch(showIngredientDetails(_id));
        }
    };

    const handleRemoveIngredient = () => {
        index && dispatch(deleteIngredient(index));
    };

    return (
        <>
            <li
                className={cn("mb-4", classes.ConstructorElement)}
                ref={ref}
                onClick={handleIngredientDetailsOpen}
            >
                {typeIngredient !== INGREDIENT_TYPE.BUN ? (
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
                    handleClose={handleRemoveIngredient}
                />
            </li>
        </>
    );
};

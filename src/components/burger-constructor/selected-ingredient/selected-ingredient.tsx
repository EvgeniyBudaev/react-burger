import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
    ConstructorElement as YaConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { useTypedSelector } from "hooks/useTypedSelector";
import { deleteIngredient, moveIngredients } from "services/burger-constructor";
import classes from "./selected-ingredient.module.css";

export interface ISelectedIngredientProps {
    _id: string;
    id?: string;
    index: number;
    price: number;
    text: string;
    thumbnail: string;
}

export const SelectedIngredient: React.FC<ISelectedIngredientProps> = ({
    _id,
    id,
    index,
    price,
    text,
    thumbnail,
}) => {
    const { mains } = useTypedSelector(state => state.burgerConstructor);
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);

    const [, dropRef] = useDrop({
        accept: "movingIngredient",
        hover(item: { index: number }) {
            if (!ref.current) {
                return;
            }
            const hoverIndex = index;
            const dragIndex = item.index;
            if (dragIndex === hoverIndex) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, dragRef] = useDrag({
        type: "movingIngredient",
        item: {
            index: index,
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const moveIngredient = (dragIndex: number, hoverIndex: number) => {
        const dragIngr = mains[dragIndex];
        const stateCopy = [...mains];
        const deletedHover = stateCopy.splice(hoverIndex, 1, dragIngr);
        stateCopy.splice(dragIndex, 1, deletedHover[0]);
        dispatch(moveIngredients(stateCopy));
    };

    const opacity = isDragging ? 0 : 1;

    dragRef(dropRef(ref));

    const handleRemoveIngredient = () => {
        id && dispatch(deleteIngredient(id));
    };

    return (
        <>
            <li
                className={cn("mb-4", classes.SelectedIngredient)}
                ref={ref}
                style={{ opacity }}
            >
                <DragIcon type="primary" />
                <YaConstructorElement
                    price={price}
                    text={text}
                    thumbnail={thumbnail}
                    handleClose={handleRemoveIngredient}
                />
            </li>
        </>
    );
};

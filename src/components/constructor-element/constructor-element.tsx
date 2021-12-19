import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
    ConstructorElement as YaConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { IngredientDetails } from "components";
import { deleteIngredient, moveIngredients } from "services/burger-constructor";
import { Modal } from "ui-kit";
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
    price?: number;
    proteins?: number;
    text?: string;
    thumbnail?: string;
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
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ isDrag }, dragRef] = useDrag({
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
            dispatch(moveIngredients(dragIndex, hoverIndex));
            item.index = hoverIndex;
        },
    });

    dragRef(dropRef(ref));

    const handleModalOpen = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    const handleRemoveIngredient = () => {
        dispatch(deleteIngredient(index));
    };

    return (
        <>
            <li
                className={cn("mb-4", classes.ConstructorElement)}
                ref={ref}
                onClick={handleModalOpen}
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
            <Modal
                title="Детали ингредиента"
                isOpen={isOpenModal}
                onCloseModal={handleModalClose}
            >
                <IngredientDetails
                    calories={calories}
                    carbohydrates={carbohydrates}
                    image={image_large}
                    fat={fat}
                    name={name}
                    proteins={proteins}
                />
            </Modal>
        </>
    );
};

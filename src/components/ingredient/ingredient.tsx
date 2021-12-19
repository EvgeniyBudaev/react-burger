import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { IngredientDetails } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { IIngredient } from "types/ingredient";
import { Modal } from "ui-kit";
import classes from "./ingredient.module.css";

export interface IIngredientProps {
    ingredient: IIngredient;
}

export const Ingredient: React.FC<IIngredientProps> = ({ ingredient }) => {
    const {
        calories,
        carbohydrates,
        _id,
        image,
        image_large,
        fat,
        name,
        price,
        proteins,
        type,
    } = ingredient;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderCount, setOrderCount] = useState(0);
    const { bun, mains } = useTypedSelector(state => state.burgerConstructor);

    useEffect(() => {
        const amountMains = mains.filter(
            ingredient => ingredient._id === _id
        ).length;
        const amountBun = bun._id === _id ? 1 : 0;
        type === INGREDIENT_TYPE.BUN
            ? setOrderCount(amountBun)
            : setOrderCount(amountMains);
    }, [mains, bun, _id, type]);

    const handleModalOpen = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),
    });

    return (
        <>
            <li
                className={classes.Ingredient}
                ref={dragRef}
                onClick={handleModalOpen}
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

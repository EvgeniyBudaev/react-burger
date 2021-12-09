import React, { useState } from "react";
import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { IngredientDetails } from "components";
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
        image,
        image_large,
        fat,
        name,
        price,
        proteins,
    } = ingredient;
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleModalOpen = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <li className={classes.Ingredient} onClick={handleModalOpen}>
                <Counter count={1} size="default" />
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
            <Modal isOpen={isOpenModal} onCloseModal={handleModalClose}>
                <Modal.Header>
                    <p className="text text_type_main-large">
                        Детали ингредиента
                    </p>
                </Modal.Header>
                <Modal.Content>
                    <IngredientDetails
                        calories={calories}
                        carbohydrates={carbohydrates}
                        image={image_large}
                        fat={fat}
                        name={name}
                        proteins={proteins}
                    />
                </Modal.Content>
            </Modal>
        </>
    );
};

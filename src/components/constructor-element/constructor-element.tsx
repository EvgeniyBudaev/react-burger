import React, { useState } from "react";
import {
    ConstructorElement as YaConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { IngredientDetails } from "components";
import { Modal } from "ui-kit";
import classes from "./constructor-element.module.css";

type ConstructorElementType = "top" | "bottom";

export interface IConstructorElementProps {
    calories?: number;
    carbohydrates?: number;
    fat?: number;
    image_large?: string;
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

    const handleModalOpen = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <li
                className={cn("mb-4", classes.ConstructorElement)}
                onClick={handleModalOpen}
            >
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

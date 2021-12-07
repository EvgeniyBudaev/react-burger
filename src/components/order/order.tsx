import React, { useEffect, useMemo, useState } from "react";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { fetchBurgerIngredients } from "api/menu";
import { BurgerConstructor, OrderDetails } from "components";
import { IIngredient } from "types/ingredient";
import { Modal, Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import classes from "./order.module.css";

export const Order: React.FC = () => {
    const BUN = "bun";
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);

    const totalPrice = useMemo(() => {
        return ingredients.reduce((acc, current) => acc + current.price, 0);
    }, [ingredients]);

    const buns = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(ingredient => ingredient.type === BUN)
        );
    }, [ingredients]);
    const contents = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(ingredient => ingredient.type !== BUN)
        );
    }, [ingredients]);
    const firstBun = buns[0];
    const lastBun = buns[1];

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetchBurgerIngredients();
                setIngredients(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                AlertError(
                    "Не удалось получить список ингредиентов для конструктора!",
                    error.message
                );
            }
        };
        void fetchProducts();
    }, []);

    const handleModalOpen = () => {
        setIsOpenModal(true);
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    if (isLoading) return <Spinner />;

    return (
        <>
            <section className={cn("mb-10 mt-25 pr-2 pl-2", classes.Order)}>
                {contents && firstBun && lastBun && (
                    <BurgerConstructor
                        ingredients={contents}
                        lastBun={lastBun}
                        firstBun={firstBun}
                    />
                )}
                <div className={classes.Control}>
                    <div className={classes.TotalPrice}>
                        <p className="text text_type_digits-medium mr-2">
                            {totalPrice}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleModalOpen}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
            <Modal isOpen={isOpenModal} onCloseModal={handleModalClose}>
                <Modal.Content>
                    <OrderDetails />
                </Modal.Content>
            </Modal>
        </>
    );
};

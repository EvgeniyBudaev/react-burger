import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AxiosError } from "axios";
import cn from "classnames";
import { fetchMakeOrder } from "api/order";
import { BurgerConstructor, OrderDetails } from "components";
import { BurgerContext, TotalPriceContext } from "context/burger";
import { IOrderDetails } from "types/order";
import { Modal, Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./order.module.css";

export const Order: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState<IOrderDetails>();
    const ingredients = useContext(BurgerContext);
    const { totalPriceState, totalPriceDispatcher } =
        useContext(TotalPriceContext);

    useEffect(() => {
        totalPriceDispatcher({ type: "sum", payload: ingredients });
    }, [ingredients, totalPriceDispatcher]);

    const buns = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(
                ingredient => ingredient.type === INGREDIENT_TYPE.BUN
            )
        );
    }, [ingredients]);
    const mains = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(
                ingredient => ingredient.type !== INGREDIENT_TYPE.BUN
            )
        );
    }, [ingredients]);
    const orderIds = useMemo(() => {
        return ingredients && ingredients.map(ingredient => ingredient._id);
    }, [ingredients]);
    const firstBun = buns && buns[0];
    const lastBun = buns && buns[0];

    const handleMakeOrderClick = () => {
        setIsLoading(true);
        const options = {
            ingredients: orderIds,
        };
        fetchMakeOrder(options)
            .then(response => {
                setIsLoading(false);
                setOrderDetails(response);
                setIsOpenModal(true);
            })
            .catch(error => {
                setIsLoading(false);
                if (error.response) {
                    const errorStatus = getErrorStatus(error as AxiosError);

                    if (errorStatus === 404) {
                        AlertError(
                            "Запрашиваемой страницы не существует! (from BurgerIngredients)",
                            error.message
                        );
                    }
                } else if (error.request) {
                    AlertError(
                        "Не правильные параметры запроса!",
                        error.message
                    );
                } else {
                    AlertError(
                        "Не удалось получить список ингредиентов для конструктора!",
                        error.message
                    );
                }
            });
    };

    const handleModalClose = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <ErrorPopup />
            <section className={cn("mb-10 mt-25 pr-2 pl-2", classes.Order)}>
                {mains && firstBun && lastBun && (
                    <BurgerConstructor
                        ingredients={mains}
                        lastBun={lastBun}
                        firstBun={firstBun}
                    />
                )}
                <div className={classes.Control}>
                    <div className={classes.TotalPrice}>
                        <p className="text text_type_digits-medium mr-2">
                            {totalPriceState.totalPrice}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleMakeOrderClick}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
            <Modal isOpen={isOpenModal} onCloseModal={handleModalClose}>
                <Modal.Content>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <OrderDetails orderDetails={orderDetails} />
                    )}
                </Modal.Content>
            </Modal>
        </>
    );
};

import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useEffect, useMemo, useState } from "react";
import { ToastContainer as ErrorPopup } from "react-toastify";
import { useDispatch } from "react-redux";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

import { BurgerConstructor, OrderDetails } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { fetchMakeOrder } from "services/order-details";
import { Modal, Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./order.module.css";

export const Order: React.FC = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { ingredients, ingredientsRequest, ingredientsError } =
        useTypedSelector(state => state.burgerIngredients);
    const { details, detailsRequest, detailsError } = useTypedSelector(
        state => state.orderDetails
    );
    const dispatch = useDispatch();
    const totalPrice = ingredients.reduce(
        (acc, current) => acc + current.price,
        0
    );

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
        const options = {
            ingredients: orderIds,
        };
        if (!detailsRequest) {
            dispatch(fetchMakeOrder(options));
            setIsOpenModal(true);
        }
    };

    useEffect(() => {
        if (detailsError) {
            if (detailsError.response) {
                const errorStatus = getErrorStatus(detailsError);

                if (errorStatus === 404) {
                    AlertError(
                        "Запрашиваемой страницы не существует! (from BurgerIngredients)",
                        detailsError.message
                    );
                }
            } else if (detailsError.request) {
                AlertError(
                    "Не правильные параметры запроса!",
                    detailsError.message
                );
            } else {
                AlertError(
                    "Не удалось получить детали заказ!",
                    detailsError.message
                );
            }
        }
    }, [detailsError]);

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
                            {totalPrice}
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
                {detailsRequest ? (
                    <Spinner />
                ) : (
                    <OrderDetails orderDetails={details} />
                )}
            </Modal>
        </>
    );
};

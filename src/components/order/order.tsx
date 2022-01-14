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
    const { ingredients } = useTypedSelector(state => state.burgerIngredients);
    const { bun, mains } = useTypedSelector(state => state.burgerConstructor);
    const { details, detailsRequest, detailsError } = useTypedSelector(
        state => state.orderDetails
    );
    const dispatch = useDispatch();
    const mainsTotalPrice = useMemo(() => {
        if (mains) {
            return mains.reduce((acc, current) => acc + current.price, 0);
        }
    }, [mains]);
    const bunsTotalPrice = bun && bun.price ? bun.price * 2 : 0;
    const mainsTotal = mainsTotalPrice ? mainsTotalPrice : 0;
    const totalPrice = bunsTotalPrice + mainsTotal;

    const orderIds = useMemo(() => {
        return ingredients && ingredients.map(ingredient => ingredient._id);
    }, [ingredients]);

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
                <BurgerConstructor />
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

import React, { useEffect, useMemo } from "react";
import { ToastContainer as ErrorPopup } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { BurgerConstructor } from "components";
import { useDispatch, useSelector } from "hooks";
import isEmpty from "lodash/isEmpty";
import { ROUTES } from "routes";
import { fetchMakeOrder } from "services/order-details";
import {
    accountSelector,
    burgerConstructorSelector,
    orderDetailsSelector,
} from "services/selectors";
import { AlertError } from "utils/alert";
import classes from "./order.module.css";

export const Order: React.FC = () => {
    const { accessToken } = useSelector(accountSelector);
    const { bun, mains } = useSelector(burgerConstructorSelector);
    const { detailsRequest, detailsError } = useSelector(orderDetailsSelector);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const mainsTotalPrice = useMemo(() => {
        if (mains) {
            return mains.reduce((acc, current) => acc + current.price, 0);
        }
    }, [mains]);
    const bunsTotalPrice = bun && bun.price ? bun.price * 2 : 0;
    const mainsTotal = mainsTotalPrice ? mainsTotalPrice : 0;
    const totalPrice = bunsTotalPrice + mainsTotal;

    const orderIds = useMemo(() => {
        return mains && mains.map(ingredient => ingredient._id).concat(bun._id);
    }, [bun, mains]);

    const handleMakeOrderClick = () => {
        if (accessToken) {
            const options = {
                ingredients: orderIds,
            };
            if (!detailsRequest) {
                history.push({
                    pathname: "/order-modal",
                    state: {
                        modal: location,
                    },
                });
                dispatch(fetchMakeOrder(options));
            }
        } else {
            history.push(ROUTES.LOGIN);
        }
    };

    useEffect(() => {
        if (detailsError) {
            AlertError(detailsError.error.body);
        }
    }, [detailsError]);

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
                        disabled={isEmpty(bun)}
                        onClick={handleMakeOrderClick}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
        </>
    );
};

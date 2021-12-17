import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer as ErrorPopup } from "react-toastify";
import { BurgerIngredients, Layout, Order } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { fetchBurgerIngredients } from "services/burger-ingredients";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./home-page.module.css";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const { ingredientsRequest, ingredientsError } = useTypedSelector(
        state => state.burgerIngredients
    );

    useEffect(() => {
        if (!ingredientsRequest) {
            dispatch(fetchBurgerIngredients());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (ingredientsError) {
            if (ingredientsError.response) {
                const errorStatus = getErrorStatus(ingredientsError);

                if (errorStatus === 404) {
                    AlertError(
                        "Запрашиваемой страницы не существует! (from BurgerIngredients)",
                        ingredientsError.message
                    );
                }
            } else if (ingredientsError.request) {
                AlertError(
                    "Не правильные параметры запроса!",
                    ingredientsError.message
                );
            } else {
                AlertError(
                    "Не удалось получить список ингредиентов для конструктора!",
                    ingredientsError.message
                );
            }
        }
    }, [ingredientsError]);

    return (
        <Layout>
            <ErrorPopup />
            <div className={classes.HomePage}>
                {ingredientsRequest ? (
                    <Spinner />
                ) : (
                    <>
                        <BurgerIngredients />
                        <Order />
                    </>
                )}
            </div>
        </Layout>
    );
};

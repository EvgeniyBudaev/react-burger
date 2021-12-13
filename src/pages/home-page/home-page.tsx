import React, { useEffect, useReducer, useState } from "react";
import { ToastContainer as ErrorPopup } from "react-toastify";
import { AxiosError } from "axios";
import { BurgerIngredients, Layout, Order } from "components";
import { BurgerContext, TotalPriceContext } from "context/burger";
import { IIngredient } from "types/ingredient";
import { fetchBurgerIngredients } from "api/menu";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./home-page.module.css";

const initialState = { totalPrice: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "sum":
            return {
                totalPrice: action.payload.reduce(
                    (acc, current) => acc + current.price,
                    0
                ),
            };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

export const HomePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [totalPriceState, totalPriceDispatcher] = useReducer(
        reducer,
        initialState,
        undefined
    );

    useEffect(() => {
        const fetchIngredients = () => {
            setIsLoading(true);
            fetchBurgerIngredients()
                .then(response => {
                    setIngredients(response.data);
                    setIsLoading(false);
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
        void fetchIngredients();
    }, []);

    return (
        <BurgerContext.Provider value={ingredients}>
            <TotalPriceContext.Provider
                value={{ totalPriceState, totalPriceDispatcher }}
            >
                <Layout>
                    <ErrorPopup />
                    <div className={classes.HomePage}>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <BurgerIngredients />
                                <Order />
                            </>
                        )}
                    </div>
                </Layout>
            </TotalPriceContext.Provider>
        </BurgerContext.Provider>
    );
};

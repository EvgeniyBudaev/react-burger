import React, { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer as ErrorPopup } from "react-toastify";
import { BurgerIngredients, Layout, Order } from "components";
import { TotalPriceContext } from "context/burger";
import { useTypedSelector } from "hooks/useTypedSelector";
import { fetchBurgerIngredients } from "services/reducers/burger-ingredients";
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
    const [totalPriceState, totalPriceDispatcher] = useReducer(
        reducer,
        initialState,
        undefined
    );
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
        <TotalPriceContext.Provider
            value={{ totalPriceState, totalPriceDispatcher }}
        >
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
        </TotalPriceContext.Provider>
    );
};

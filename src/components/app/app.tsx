import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    AppHeader,
    IngredientDetails,
    ModalIngredientDetails,
    ProtectedRoute,
} from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import {
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
} from "pages";
import { ROUTES } from "routes";
import { fetchBurgerIngredients } from "services/burger-ingredients";
import { Spinner } from "ui-kit";
import { getErrorStatus } from "utils/error";
import { AlertError } from "utils/alert";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/index.css";

export const App: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isModalOpen = location.state && location.state.modal;
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
        <>
            <ErrorPopup />
            {ingredientsRequest ? (
                <Spinner />
            ) : (
                <DndProvider backend={HTML5Backend}>
                    <AppHeader />
                    <Switch location={isModalOpen ?? location}>
                        <Route path={ROUTES.HOME} component={HomePage} exact />
                        <Route
                            path={ROUTES.LOGIN}
                            component={LoginPage}
                            exact
                        />
                        <Route
                            path={ROUTES.REGISTER}
                            component={RegisterPage}
                            exact
                        />
                        <Route
                            path={ROUTES.FORGOT_PASSWORD}
                            component={ForgotPasswordPage}
                            exact
                        />
                        <Route
                            path={ROUTES.RESET_PASSWORD}
                            component={ResetPasswordPage}
                            exact
                        />
                        <ProtectedRoute path={ROUTES.PROFILE}>
                            <Route exact>
                                <ProfilePage />
                            </Route>
                        </ProtectedRoute>
                        <Route
                            path={`${ROUTES.INGREDIENTS}/:id`}
                            component={IngredientDetails}
                            exact
                        />
                    </Switch>
                    {isModalOpen && (
                        <Route
                            path={`${ROUTES.INGREDIENTS}/:id`}
                            children={<ModalIngredientDetails />}
                            exact
                        />
                    )}
                </DndProvider>
            )}
        </>
    );
};

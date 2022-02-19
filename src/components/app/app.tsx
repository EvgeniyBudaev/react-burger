import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    AppHeader,
    IngredientDetails,
    ModalIngredientDetails,
    ModalOrderDetails,
    ModalOrderIngredients,
    OrderCardIngredientsDetails,
    ProtectedRoute,
} from "components";
import { useDispatch, useSelector } from "hooks";
import {
    FeedPage,
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    NotFound404,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
} from "pages";
import { ROUTES } from "routes";
import { fetchBurgerIngredients } from "services/burger-ingredients";
import { burgerIngredientsSelector } from "services/selectors";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/index.css";

export const App: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isModalOpen = location.state && location.state.modal;
    const { ingredientsRequest, ingredientsError } = useSelector(
        burgerIngredientsSelector
    );

    useEffect(() => {
        if (!ingredientsRequest) {
            dispatch(fetchBurgerIngredients());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (ingredientsError) {
            AlertError(ingredientsError.error.body);
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
                        <ProtectedRoute
                            path={`${ROUTES.PROFILE}${ROUTES.ORDERS}/:id`}
                        >
                            <Route exact>
                                <OrderCardIngredientsDetails />
                            </Route>
                        </ProtectedRoute>
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
                        <Route
                            path={`${ROUTES.FEED}`}
                            component={FeedPage}
                            exact
                        />
                        <Route
                            path={`${ROUTES.FEED}/:id`}
                            component={OrderCardIngredientsDetails}
                            exact
                        />
                        <Route component={NotFound404} />
                    </Switch>
                    {isModalOpen && (
                        <>
                            <Route
                                path={`${ROUTES.INGREDIENTS}/:id`}
                                children={<ModalIngredientDetails />}
                                exact
                            />
                            <ProtectedRoute
                                path={`${ROUTES.PROFILE}${ROUTES.ORDERS}/:id`}
                            >
                                <Route
                                    children={<ModalOrderIngredients />}
                                    exact
                                />
                            </ProtectedRoute>
                            <Route
                                path={`${ROUTES.FEED}/:id`}
                                children={<ModalOrderIngredients />}
                                exact
                            />
                            <Route
                                path="/order-modal"
                                children={<ModalOrderDetails />}
                                exact
                            />
                        </>
                    )}
                </DndProvider>
            )}
        </>
    );
};

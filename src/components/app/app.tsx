import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { IngredientDetails, Layout, ProtectedRoute } from "components";
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
import { hideIngredientDetails } from "services/ingredient-details";
import { Modal } from "ui-kit";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/index.css";

export const App: React.FC = () => {
    const { iSIngredientDetailsActive } = useTypedSelector(
        state => state.ingredientDetails
    );
    const dispatch = useDispatch();

    const handleIngredientDetailsClose = () => {
        dispatch(hideIngredientDetails());
    };

    return (
        <Switch>
            <Route path={ROUTES.HOME} component={HomePage} exact />
            <Route path={ROUTES.LOGIN} component={LoginPage} exact />
            <Route path={ROUTES.REGISTER} component={RegisterPage} exact />
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
            {iSIngredientDetailsActive ? (
                <Route path={`${ROUTES.INGREDIENTS}/:id`} exact>
                    <Modal
                        title="Детали ингредиента"
                        isOpen={iSIngredientDetailsActive}
                        onCloseModal={handleIngredientDetailsClose}
                    >
                        <IngredientDetails
                            isModalOpen={iSIngredientDetailsActive}
                        />
                    </Modal>
                </Route>
            ) : (
                <Route path={`${ROUTES.INGREDIENTS}/:id`} exact>
                    <Layout>
                        <IngredientDetails
                            isModalOpen={iSIngredientDetailsActive}
                        />
                    </Layout>
                </Route>
            )}
        </Switch>
    );
};

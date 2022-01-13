import React from "react";
import { Route, Switch } from "react-router-dom";
import {
    ForgotPasswordPage,
    HomePage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    ResetPasswordPage,
} from "pages";
import { ROUTES } from "routes";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/index.css";

export const App: React.FC = () => {
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
            <Route path={ROUTES.PROFILE} component={ProfilePage} exact />
        </Switch>
    );
};

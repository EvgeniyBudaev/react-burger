import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer as ErrorPopup } from "react-toastify";
import cn from "classnames";
import {
    Layout,
    OrdersHistory,
    ProfileDetails,
    ProfileNavigation,
} from "components";
import { useDispatch, useSelector } from "hooks";
import { ROUTES } from "routes";
import { getUser } from "services/account";
import { accountSelector } from "services/selectors";
import { AlertError } from "utils/alert";
import classes from "./profile-page.module.css";

export const ProfilePage: React.FC = () => {
    const { accessToken, error } = useSelector(accountSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            AlertError(error.error.body);
        }
    }, [error]);

    if (!accessToken) {
        return <Redirect to={ROUTES.LOGIN} />;
    }

    return (
        <Layout>
            <ErrorPopup />
            <section className={classes.ProfilePage}>
                <div className={cn("mt-30", classes.Inner)}>
                    <ProfileNavigation />
                    <Switch>
                        <Route path={ROUTES.PROFILE} exact>
                            <ProfileDetails />
                        </Route>
                        <Route path={`${ROUTES.PROFILE}${ROUTES.ORDERS}`} exact>
                            <OrdersHistory />
                        </Route>
                    </Switch>
                </div>
            </section>
        </Layout>
    );
};

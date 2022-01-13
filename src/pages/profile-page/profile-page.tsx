import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer as ErrorPopup } from "react-toastify";
import cn from "classnames";
import { CustomLink, Layout, ProfileDetails } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ROUTES } from "routes";
import { logout } from "services/account";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./profile-page.module.css";

export const ProfilePage: React.FC = () => {
    const {
        accessToken,
        error,
        logoutRequest: isLogoutLoading,
    } = useTypedSelector(state => state.account);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            if (error.response) {
                const errorStatus = getErrorStatus(error);

                if (errorStatus === 404) {
                    AlertError(
                        "Запрашиваемой страницы не существует!",
                        error.message
                    );
                }
            } else if (error.request) {
                AlertError("Не правильные параметры запроса!", error.message);
            } else {
                AlertError("Не удалось выйти!", error.message);
            }
        }
    }, [error]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (isLogoutLoading) return <Spinner />;

    if (!accessToken) {
        return <Redirect to={ROUTES.HOME} />;
    }

    return (
        <Layout>
            <ErrorPopup />
            <section className={classes.ProfilePage}>
                <div className={cn("mt-30", classes.Inner)}>
                    <div className={classes.Left}>
                        <nav className={cn("mr-15 mb-20", classes.MenuPanel)}>
                            <CustomLink
                                className={classes.MenuPanelItem}
                                routeTo={ROUTES.PROFILE}
                                title="Профиль"
                            />
                            <CustomLink
                                className={classes.MenuPanelItem}
                                routeTo={ROUTES.ORDERS}
                                title="История заказов"
                            />
                            <div
                                className={classes.Logout}
                                onClick={handleLogout}
                            >
                                <p
                                    className={cn(
                                        "text text_type_main-medium text_color_inactive",
                                        classes.LogoutText
                                    )}
                                >
                                    Выход
                                </p>
                            </div>
                        </nav>
                        <p className="text text_type_main-default text_color_inactive">
                            В этом разделе вы можете изменить свои персональные
                            данные
                        </p>
                    </div>
                    <div className={classes.Right}>
                        <ProfileDetails />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

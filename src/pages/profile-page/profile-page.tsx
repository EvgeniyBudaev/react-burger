import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { CustomLink, Layout } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ROUTES } from "routes";
import { logout } from "services/account";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./profile-page.module.css";

export const ProfilePage: React.FC = () => {
    const {
        error,
        logoutRequest: isLogoutLoading,
        user,
    } = useTypedSelector(state => state.account);
    const [formState, setFormState] = useState({
        email: "",
        name: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            setFormState({ ...formState, email: user.email, name: user.name });
        }
    }, [formState, user]);
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

    const handleChange = event => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    if (isLogoutLoading) return <Spinner />;

    if (!user) {
        return <Redirect to={ROUTES.LOGIN} />;
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
                        <form className={classes.Form}>
                            <div className={classes.FormItem}>
                                <Input
                                    name="name"
                                    placeholder="Имя"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.FormItem}>
                                <EmailInput
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.FormItem}>
                                <PasswordInput
                                    name="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

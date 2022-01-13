import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Layout } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ROUTES } from "routes";
import { login } from "services/account";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./login-page.module.css";

export const LoginPage: React.FC = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const {
        accessToken,
        error,
        loginRequest: isLoading,
    } = useTypedSelector(state => state.account);
    const dispatch = useDispatch();
    const { state } = useLocation();

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
                AlertError("Не удалось авторизоваться!", error.message);
            }
        }
    }, [error]);

    const handleChange = event => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(login(formState));
    };

    if (isLoading) return <Spinner />;

    if (accessToken) {
        return <Redirect to={state?.from || ROUTES.HOME} />;
    }

    return (
        <Layout>
            <ErrorPopup />
            <section className={classes.LoginPage}>
                <div className={cn(classes.Inner)}>
                    <p
                        className={cn(
                            "text text_type_main-medium mb-6",
                            classes.Title
                        )}
                    >
                        Вход
                    </p>
                    <form className={classes.Form} onSubmit={handleSubmitForm}>
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
                        <div className={classes.FormItem}>
                            <Button>Войти</Button>
                        </div>
                    </form>
                    <div className={classes.Footer}>
                        <div className={cn("mb-4", classes.FooterRow)}>
                            <p
                                className={cn(
                                    "text text_type_main-default text_color_inactive",
                                    classes.FooterText
                                )}
                            >
                                Вы — новый пользователь?
                            </p>
                            <Link
                                className={classes.FooterLink}
                                to={ROUTES.REGISTER}
                            >
                                Зарегистрироваться
                            </Link>
                        </div>
                        <div className={cn(classes.FooterRow)}>
                            <p
                                className={cn(
                                    "text text_type_main-default text_color_inactive",
                                    classes.FooterText
                                )}
                            >
                                Забыли пароль?
                            </p>
                            <Link
                                className={classes.FooterLink}
                                to={ROUTES.FORGOT_PASSWORD}
                            >
                                Восстановить пароль
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Layout } from "components";
import { useDispatch, useSelector } from "hooks";
import { ROUTES } from "routes";
import { resetPassword } from "services/account";
import { accountSelector } from "services/selectors";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import classes from "./reset-password-page.module.css";

export const ResetPasswordPage: React.FC = () => {
    const [formState, setFormState] = useState({
        password: "",
        token: "",
    });
    const {
        emailSent,
        passwordReseted,
        error,
        resetPasswordRequest: isLoading,
    } = useSelector(accountSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            AlertError(error.error.body);
        }
    }, [error]);

    const handleChange = event => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(resetPassword(formState));
    };

    if (isLoading) return <Spinner />;

    if (passwordReseted) {
        return <Redirect to={ROUTES.LOGIN} />;
    }

    if (!emailSent) {
        return <Redirect to={ROUTES.FORGOT_PASSWORD} />;
    }

    return (
        <Layout>
            <ErrorPopup />
            <section className={classes.ResetPasswordPage}>
                <div className={classes.Inner}>
                    <p
                        className={cn(
                            "text text_type_main-medium mb-6",
                            classes.Title
                        )}
                    >
                        Восстановление пароля
                    </p>
                    <form className={classes.Form} onSubmit={handleSubmitForm}>
                        <div className={classes.FormItem}>
                            <PasswordInput
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.FormItem}>
                            <Input
                                name="token"
                                placeholder="Введите код из письма"
                                value={formState.token}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.FormItem}>
                            <Button>Сохранить</Button>
                        </div>
                    </form>
                    <div className={classes.Footer}>
                        <div className={classes.FooterRow}>
                            <p
                                className={cn(
                                    "text text_type_main-default text_color_inactive",
                                    classes.FooterText
                                )}
                            >
                                Вспомнили пароль?
                            </p>
                            <Link
                                className={classes.FooterLink}
                                to={ROUTES.LOGIN}
                            >
                                Войти
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

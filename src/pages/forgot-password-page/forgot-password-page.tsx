import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Layout } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ROUTES } from "routes";
import { forgotPassword } from "services/account";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./forgot-password-page.module.css";

export const ForgotPasswordPage: React.FC = () => {
    const [formState, setFormState] = useState({
        email: "",
    });
    const {
        emailSent,
        error,
        forgotPasswordRequest: isLoading,
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
                AlertError("Не удалось восстановить пароль!", error.message);
            }
        }
    }, [error]);

    const handleChange = event => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(forgotPassword(formState));
    };

    if (isLoading) return <Spinner />;

    if (emailSent) {
        return <Redirect to={ROUTES.RESET_PASSWORD} />;
    }

    return (
        <Layout>
            <ErrorPopup />
            <section className={classes.ForgotPasswordPage}>
                <div className={classes.Inner}>
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
                            <Button>Восстановить</Button>
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

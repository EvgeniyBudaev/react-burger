import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Layout } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ROUTES } from "routes";
import { register } from "services/account";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./register-page.module.css";

export const RegisterPage: React.FC = () => {
    const [formState, setFormState] = useState({
        email: "",
        name: "",
        password: "",
    });
    const { accessToken, error, registerRequest } = useTypedSelector(
        state => state.account
    );
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
                AlertError("Не удалось зарегистрироваться!", error.message);
            }
        }
    }, [error]);

    const handleChange = event => {
        setFormState({ ...formState, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(register(formState));
    };

    if (registerRequest) return <Spinner />;

    if (accessToken) {
        return <Redirect to={ROUTES.HOME} />;
    }

    return (
        <Layout>
            <ErrorPopup />
            <section className={classes.RegisterPage}>
                <div className={classes.Inner}>
                    <p
                        className={cn(
                            "text text_type_main-medium mb-6",
                            classes.Title
                        )}
                    >
                        Регистрация
                    </p>
                    <form className={classes.Form} onSubmit={handleSubmitForm}>
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
                        <div className={classes.FormItem}>
                            <Button>Зарегистрироваться</Button>
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
                                Уже зарегистрированы?
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

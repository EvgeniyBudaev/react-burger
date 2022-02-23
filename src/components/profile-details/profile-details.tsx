import React, { useEffect, useState } from "react";
import { ToastContainer as ErrorPopup } from "react-toastify";
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { useDispatch, useSelector } from "hooks";
import { updateUser } from "services/account";
import { accountSelector } from "services/selectors";
import { AlertError } from "utils/alert";
import classes from "./profile-details.module.css";

export const ProfileDetails: React.FC = () => {
    const initialFormState = {
        email: "",
        name: "",
        password: "",
    };
    const { error, user } = useSelector(accountSelector);
    const [formState, setFormState] = useState(initialFormState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setFormState({ ...formState, email: user.email, name: user.name });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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
        dispatch(updateUser(formState));
    };

    const handleCancel = (event: React.SyntheticEvent<Element, Event>) => {
        event.preventDefault();
        if (user) {
            setFormState({
                ...formState,
                email: user.email,
                name: user.name,
                password: "",
            });
        } else {
            setFormState(initialFormState);
        }
    };

    return (
        <>
            <ErrorPopup />
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
                <div className={cn("mt-6", classes.Controls)}>
                    <div className="mr-2">
                        <Button onClick={handleCancel}>Отменить</Button>
                    </div>
                    <div>
                        <Button>Применить</Button>
                    </div>
                </div>
            </form>
        </>
    );
};

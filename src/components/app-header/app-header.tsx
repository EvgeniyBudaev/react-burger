import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ROUTES } from "routes";
import cn from "classnames";
import { CustomLink } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { Spacer } from "ui-kit";
import classes from "./app-header.module.css";

export const AppHeader: React.FC = () => {
    const { accessToken } = useTypedSelector(state => state.account);

    return (
        <header className={cn("pb-4 pt-4", classes.AppHeader)}>
            <div className={cn("center_on_width", classes.Container)}>
                <nav className={classes.Navigation}>
                    <CustomLink
                        iconType="burger"
                        routeTo={ROUTES.HOME}
                        title="Конструктор"
                    />
                    <CustomLink
                        iconType="list"
                        routeTo={ROUTES.ORDER_LIST}
                        title="Лента заказов"
                    />
                </nav>
                <Spacer />
                <Link to={ROUTES.HOME}>
                    <Logo />
                </Link>
                <Spacer />
                {accessToken ? (
                    <CustomLink
                        iconType="profile"
                        routeTo={ROUTES.PROFILE}
                        title="Личный кабинет"
                    />
                ) : (
                    <CustomLink
                        iconType="profile"
                        routeTo={ROUTES.LOGIN}
                        title="Войти"
                    />
                )}
            </div>
        </header>
    );
};

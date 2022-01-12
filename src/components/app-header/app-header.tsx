import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ROUTES } from "routes";
import cn from "classnames";
import { useTypedSelector } from "hooks/useTypedSelector";
import { Spacer } from "ui-kit";
import { AppHeaderLink } from "./app-header-link";
import classes from "./app-header.module.css";

export const AppHeader: React.FC = () => {
    const { accessToken } = useTypedSelector(state => state.account);

    return (
        <header className={cn("pb-4 pt-4", classes.AppHeader)}>
            <div className={cn("center_on_width", classes.Container)}>
                <nav className={classes.Navigation}>
                    <AppHeaderLink
                        iconType="burger"
                        routeTo={ROUTES.HOME}
                        title="Конструктор"
                    />
                    <AppHeaderLink
                        iconType="list"
                        routeTo={ROUTES.ORDER_LIST}
                        title="Лента заказов"
                    />
                </nav>
                <Spacer />
                <Logo />
                <Spacer />
                {accessToken ? (
                    <AppHeaderLink
                        iconType="profile"
                        routeTo={ROUTES.PERSONAL_AREA}
                        title="Личный кабинет"
                    />
                ) : (
                    <AppHeaderLink
                        iconType="profile"
                        routeTo={ROUTES.LOGIN}
                        title="Войти"
                    />
                )}
            </div>
        </header>
    );
};

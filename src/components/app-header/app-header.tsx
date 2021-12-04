import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { ROUTES } from "routes";
import cn from "classnames";
import { Spacer } from "ui-kit";
import { AppHeaderLink } from "./app-header-link";
import classes from "./app-header.module.css";

export const AppHeader: React.FC = () => {
    return (
        <header
            className={cn("pb-4 pt-4", classes.AppHeader)}
            style={{ backgroundColor: "#1C1C21" }}
        >
            <nav>
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
            <AppHeaderLink
                iconType="profile"
                routeTo={ROUTES.PERSONAL_AREA}
                title="Личный кабинет"
            />
        </header>
    );
};

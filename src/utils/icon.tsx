import React from "react";
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const getIconByType = (
    type: string,
    isActive: boolean
): JSX.Element | undefined => {
    if (type === "burger") {
        return <BurgerIcon type={isActive ? "primary" : "secondary"} />;
    }
    if (type === "list") {
        return <ListIcon type={isActive ? "primary" : "secondary"} />;
    }
    if (type === "profile") {
        return <ProfileIcon type={isActive ? "primary" : "secondary"} />;
    }
};

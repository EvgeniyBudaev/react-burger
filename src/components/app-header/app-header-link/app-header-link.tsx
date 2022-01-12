import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import { getIconByType } from "utils/icon";
import classes from "./app-header-link.module.css";

type IconType = "burger" | "list" | "profile";

export interface IAppHeaderLink {
    iconType?: IconType;
    routeTo: string;
    title?: string;
}

export const AppHeaderLink: React.FC<IAppHeaderLink> = ({
    iconType,
    routeTo,
    title = "",
}) => {
    const location = useLocation();
    const isActiveLink = location.pathname === routeTo;

    return (
        <div className={classes.AppHeaderLink}>
            <NavLink
                className={cn(classes.Link, {
                    [classes.Link__active]: isActiveLink,
                })}
                to={routeTo}
            >
                {iconType && getIconByType(iconType, isActiveLink)}
                <p className="text text_type_main-default text_color_inactive">
                    {title}
                </p>
            </NavLink>
        </div>
    );
};

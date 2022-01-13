import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import { getIconByType } from "utils/icon";
import classes from "./custom-link.module.css";

type IconType = "burger" | "list" | "profile";

export interface ICustomLink {
    className?: string;
    iconType?: IconType;
    routeTo: string;
    title?: string;
}

export const CustomLink: React.FC<ICustomLink> = ({
    className,
    iconType,
    routeTo,
    title = "",
}) => {
    const location = useLocation();
    const isActiveLink = location.pathname === routeTo;

    return (
        <div className={cn(classes.CustomLink, className)}>
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

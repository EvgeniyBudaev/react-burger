import React, { ReactNode } from "react";
import cn from "classnames";
import { AppHeader } from "components";
import classes from "./layout.module.css";

export interface ILayoutProps {
    children?: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <AppHeader />
            <main className={cn("pl-4 pr-4", classes.Main)}>{children}</main>
        </>
    );
};

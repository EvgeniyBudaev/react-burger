import React, { ReactNode } from "react";
import cn from "classnames";
import classes from "./layout.module.css";

export interface ILayoutProps {
    children?: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <main className={cn("pl-4 pr-4 center_on_width", classes.Main)}>
                {children}
            </main>
        </>
    );
};

import React from "react";
import { Icon } from "ui-kit";
import classes from "./spinner.module.css";

export const Spinner: React.FC = () => {
    return (
        <div className={classes.Spinner}>
            <Icon type="Spinner" />
        </div>
    );
};

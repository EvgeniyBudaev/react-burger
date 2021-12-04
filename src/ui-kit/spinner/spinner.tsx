import React from "react";
import { Icon } from "ui-kit";
import styles from "./spinner.module.css";

export const Spinner: React.FC = () => {
    return (
        <div className={styles.Spinner}>
            <Icon type="Spinner" />
        </div>
    );
};

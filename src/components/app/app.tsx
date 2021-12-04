import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "routes";
import { HomePage } from "pages";
import "../../styles/index.css";
import classes from "./app.module.css";

export const App: React.FC = () => {
    return (
        <div className={classes.App}>
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
            </Routes>
        </div>
    );
};

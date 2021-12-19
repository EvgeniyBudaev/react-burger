import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "routes";
import { HomePage } from "pages";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/index.css";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
        </Routes>
    );
};

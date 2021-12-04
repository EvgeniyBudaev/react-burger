import React from "react";
import { AppHeader, BurgerIngredients } from "components";

export const HomePage: React.FC = () => {
    return (
        <>
            <AppHeader />
            <main>
                <BurgerIngredients />
            </main>
        </>
    );
};

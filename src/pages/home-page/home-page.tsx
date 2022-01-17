import React from "react";
import { BurgerIngredients, Layout, Order } from "components";
import classes from "./home-page.module.css";

export const HomePage: React.FC = () => {
    return (
        <Layout>
            <div className={classes.HomePage}>
                <BurgerIngredients />
                <Order />
            </div>
        </Layout>
    );
};

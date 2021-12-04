import React, { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchSearchProducts } from "api/menu";
import { Menu } from "components";
import { Spinner } from "ui-kit";
import { getMenuTitle } from "utils/menu";
import classes from "./burger-ingredients.module.css";

export const BurgerIngredients: React.FC = () => {
    const BUN = "bun";
    const MAIN = "main";
    const SAUCE = "sauce";
    const [currentTab, setCurrentTab] = React.useState(BUN);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetchSearchProducts();
                setProducts(response.data);
                setIsLoading(false);
            } catch (e) {
                console.log("Error");
                setIsLoading(false);
            }
        };
        void fetchProducts();
    }, []);

    const activeMenu =
        products && products.filter(product => product.type === currentTab);

    return (
        <div className="mb-10 mt-10">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={classes.Tabs}>
                <Tab
                    value={BUN}
                    active={currentTab === BUN}
                    onClick={setCurrentTab}
                >
                    Булки
                </Tab>
                <Tab
                    value={SAUCE}
                    active={currentTab === SAUCE}
                    onClick={setCurrentTab}
                >
                    Соусы
                </Tab>
                <Tab
                    value={MAIN}
                    active={currentTab === MAIN}
                    onClick={setCurrentTab}
                >
                    Начинки
                </Tab>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <Menu menu={activeMenu} title={getMenuTitle(currentTab)} />
            )}
        </div>
    );
};

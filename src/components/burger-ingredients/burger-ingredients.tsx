import React, { useEffect, useMemo, useState } from "react";
import { ToastContainer as Error } from "react-toastify";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { fetchBurgerIngredients } from "api/menu";
import { Menu } from "components";
import { IIngredient } from "types/ingredient";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getMenuTitle } from "utils/menu";
import classes from "./burger-ingredients.module.css";

export const BurgerIngredients: React.FC = () => {
    const BUN = "bun";
    const MAIN = "main";
    const SAUCE = "sauce";
    const [currentTab, setCurrentTab] = React.useState(BUN);
    const [isLoading, setIsLoading] = useState(false);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetchBurgerIngredients();
                setIngredients(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                AlertError(
                    "Не удалось получить список ингредиентов для конструктора!",
                    error.message
                );
            }
        };
        void fetchProducts();
    }, []);

    const activeMenu = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(ingredient => ingredient.type === currentTab)
        );
    }, [currentTab, ingredients]);

    return (
        <section className={cn("mb-10 mt-10", classes.BurgerIngredients)}>
            <Error />
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={cn("mb-10", classes.Tabs)}>
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
        </section>
    );
};

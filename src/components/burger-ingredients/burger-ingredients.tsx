import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { Menu } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { newGuid } from "utils/guid";
import classes from "./burger-ingredients.module.css";

export const BurgerIngredients: React.FC = () => {
    const [currentTab, setCurrentTab] = React.useState<string>(
        INGREDIENT_TYPE.BUN
    );
    const { ingredients } = useTypedSelector(state => state.burgerIngredients);
    const history = useHistory();
    const titleToScrollRef = useRef({
        current: null,
    });

    useEffect(() => {
        if (titleToScrollRef.current) {
            titleToScrollRef.current[currentTab]?.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [currentTab]);

    const buns = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(
                ingredient => ingredient.type === INGREDIENT_TYPE.BUN
            )
        );
    }, [ingredients]);
    const mains = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(
                ingredient => ingredient.type === INGREDIENT_TYPE.MAIN
            )
        );
    }, [ingredients]);
    const sauces = useMemo(() => {
        return (
            ingredients &&
            ingredients.filter(
                ingredient => ingredient.type === INGREDIENT_TYPE.SAUCE
            )
        );
    }, [ingredients]);
    const ingredientsListFiltered = [
        { id: newGuid(), type: INGREDIENT_TYPE.BUN, list: buns },
        { id: newGuid(), type: INGREDIENT_TYPE.MAIN, list: mains },
        { id: newGuid(), type: INGREDIENT_TYPE.SAUCE, list: sauces },
    ];

    const handleChangeTab = (value: string) => {
        setCurrentTab(value);
        history.push(`/#${value}`);
    };

    return (
        <section className={cn("mb-10 mt-10", classes.BurgerIngredients)}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={cn("mb-10", classes.Tabs)}>
                <Tab
                    value={INGREDIENT_TYPE.BUN}
                    active={currentTab === INGREDIENT_TYPE.BUN}
                    onClick={handleChangeTab}
                >
                    Булки
                </Tab>
                <Tab
                    value={INGREDIENT_TYPE.SAUCE}
                    active={currentTab === INGREDIENT_TYPE.SAUCE}
                    onClick={handleChangeTab}
                >
                    Соусы
                </Tab>
                <Tab
                    value={INGREDIENT_TYPE.MAIN}
                    active={currentTab === INGREDIENT_TYPE.MAIN}
                    onClick={handleChangeTab}
                >
                    Начинки
                </Tab>
            </div>
            <Menu menu={ingredientsListFiltered} ref={titleToScrollRef} />
        </section>
    );
};

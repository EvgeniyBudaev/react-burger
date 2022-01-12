import { INGREDIENT_TYPE } from "constants/ingredient";
import React, { useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { IngredientDetails, Menu } from "components";
import { useTypedSelector } from "hooks/useTypedSelector";
import { hideIngredientDetails } from "services/ingredient-details";
import { Modal } from "ui-kit";
import { newGuid } from "utils/guid";
import classes from "./burger-ingredients.module.css";

export const BurgerIngredients: React.FC = () => {
    const [currentTab, setCurrentTab] = React.useState<string>(
        INGREDIENT_TYPE.BUN
    );
    const { ingredients } = useTypedSelector(state => state.burgerIngredients);
    const { ingredientDetailsId, iSIngredientDetailsActive } = useTypedSelector(
        state => state.ingredientDetails
    );
    const history = useHistory();
    const dispatch = useDispatch();
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

    const handleIngredientDetailsClose = () => {
        dispatch(hideIngredientDetails());
    };

    const ingredientDetails = useMemo(() => {
        return (
            ingredients &&
            ingredients.find(
                ingredient => ingredient._id === ingredientDetailsId
            )
        );
    }, [ingredientDetailsId, ingredients]);

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
            {iSIngredientDetailsActive && ingredientDetails && (
                <Modal
                    title="Детали ингредиента"
                    isOpen={iSIngredientDetailsActive}
                    onCloseModal={handleIngredientDetailsClose}
                >
                    <IngredientDetails
                        calories={ingredientDetails.calories}
                        carbohydrates={ingredientDetails.carbohydrates}
                        image={ingredientDetails.image_large}
                        fat={ingredientDetails.fat}
                        name={ingredientDetails.name}
                        proteins={ingredientDetails.proteins}
                    />
                </Modal>
            )}
        </section>
    );
};

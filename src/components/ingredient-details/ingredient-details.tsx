import React, { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import cn from "classnames";
import { useSelector } from "hooks";
import { burgerIngredientsSelector } from "services/selectors";
import { Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import classes from "./ingredient-details.module.css";

export interface IIngredientDetailsProps {
    isModalOpen?: boolean;
}

export const IngredientDetails: React.FC<IIngredientDetailsProps> = () => {
    const { ingredients, ingredientsError } = useSelector(
        burgerIngredientsSelector
    );
    const location = useLocation();
    const { id } = useParams<{ id?: string }>();
    const isModalOpen = location.state && location.state.modal;

    useEffect(() => {
        if (ingredientsError) {
            AlertError(ingredientsError.error.body);
        }
    }, [ingredientsError]);

    const ingredientDetails = useMemo(() => {
        return (
            ingredients && ingredients.find(ingredient => ingredient._id === id)
        );
    }, [id, ingredients]);

    if (!ingredientDetails) return <Spinner />;

    const { calories, carbohydrates, image, fat, name, proteins } =
        ingredientDetails;

    return (
        <section className={classes.ingredientDetails}>
            {!isModalOpen && (
                <h1 className={cn("text text_type_main-large", classes.Title)}>
                    Детали ингредиента
                </h1>
            )}
            <div className={cn("mb-4 center_on_width", classes.Image)}>
                <img src={image} alt={name} />
            </div>
            <div className={cn(classes.Container, "center_on_width")}>
                <p
                    className={cn(
                        "text text_type_main-medium mb-8",
                        classes.Title
                    )}
                    data-cy="ingredient-modal-name"
                >
                    {name}
                </p>
                <ul className={classes.Details}>
                    <li className={classes.Detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">
                            Калории,ккал
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {calories}
                        </p>
                    </li>
                    <li className={classes.Detail}>
                        <p
                            className="text text_type_main-default text_color_inactive mb-2"
                            data-cy="ingredient-modal-item"
                        >
                            Белки,г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {proteins}
                        </p>
                    </li>
                    <li className={classes.Detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">
                            Жиры,г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {fat}
                        </p>
                    </li>
                    <li className={classes.Detail}>
                        <p className="text text_type_main-default text_color_inactive mb-2">
                            Углеводы,г
                        </p>
                        <p className="text text_type_digits-default text_color_inactive">
                            {carbohydrates}
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

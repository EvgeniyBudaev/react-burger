import React, { useEffect, useMemo } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import cn from "classnames";
import { useTypedSelector } from "hooks/useTypedSelector";
import { Modal, Spinner } from "ui-kit";
import { AlertError } from "utils/alert";
import { getErrorStatus } from "utils/error";
import classes from "./ingredient-details.module.css";

export interface IIngredientDetailsProps {
    isModalOpen?: boolean;
}

export const IngredientDetails: React.FC<IIngredientDetailsProps> = () => {
    const { ingredients, ingredientsError } = useTypedSelector(
        state => state.burgerIngredients
    );
    const history = useHistory();
    const location = useLocation();
    const { id } = useParams<{ id?: string }>();
    const isModalOpen = location.state && location.state.modal;

    useEffect(() => {
        if (ingredientsError) {
            if (ingredientsError.response) {
                const errorStatus = getErrorStatus(ingredientsError);

                if (errorStatus === 404) {
                    AlertError(
                        "Запрашиваемой страницы не существует!",
                        ingredientsError.message
                    );
                }
            } else if (ingredientsError.request) {
                AlertError(
                    "Не правильные параметры запроса!",
                    ingredientsError.message
                );
            } else {
                AlertError(
                    "Не удалось получить список ингредиентов!",
                    ingredientsError.message
                );
            }
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

    const content = (
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
                        <p className="text text_type_main-default text_color_inactive mb-2">
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

    return (
        <>
            {isModalOpen ? (
                <Modal
                    title="Детали ингредиента"
                    isOpen={isModalOpen}
                    onCloseModal={() => history.goBack()}
                >
                    {content}
                </Modal>
            ) : (
                content
            )}
        </>
    );
};

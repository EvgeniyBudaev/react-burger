import React from "react";
import cn from "classnames";
import classes from "./ingredient-details.module.css";

export interface IIngredientDetailsProps {
    calories?: number;
    carbohydrates?: number;
    image?: string;
    fat?: number;
    name?: string;
    proteins?: number;
}

export const IngredientDetails: React.FC<IIngredientDetailsProps> = ({
    calories,
    carbohydrates,
    image,
    fat,
    name,
    proteins,
}) => {
    return (
        <>
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
        </>
    );
};

import React from "react";
import { ConstructorElement } from "components";
import { Scrollbar } from "ui-kit";
import { IIngredient } from "types/ingredient";

export interface IBurgerConstructorProps {
    ingredients: IIngredient[];
    lastBun: IIngredient;
    firstBun: IIngredient;
}

export const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({
    ingredients,
    lastBun,
    firstBun,
}) => {
    return (
        <ul className="mb-10">
            <ConstructorElement
                calories={firstBun.calories}
                carbohydrates={firstBun.carbohydrates}
                fat={firstBun.fat}
                image_large={firstBun.image_large}
                isLocked={true}
                name={firstBun.name}
                price={firstBun.price}
                proteins={firstBun.proteins}
                text={`${firstBun.name} (верх)`}
                thumbnail={firstBun.image_mobile}
                type="top"
                typeIngredient={firstBun.type}
            />
            <Scrollbar
                autoHeight
                autoHeightMin={469}
                autoHeightMax={469}
                hideTracksWhenNotNeeded
            >
                {ingredients &&
                    ingredients.map(ingredient => (
                        <ConstructorElement
                            key={ingredient._id}
                            calories={ingredient.calories}
                            carbohydrates={ingredient.carbohydrates}
                            fat={ingredient.fat}
                            image_large={ingredient.image_large}
                            name={ingredient.name}
                            price={ingredient.price}
                            proteins={ingredient.proteins}
                            text={ingredient.name}
                            thumbnail={ingredient.image_mobile}
                            typeIngredient={ingredient.type}
                        />
                    ))}
            </Scrollbar>
            <ConstructorElement
                calories={lastBun.calories}
                carbohydrates={lastBun.carbohydrates}
                fat={lastBun.fat}
                image_large={lastBun.image_large}
                isLocked={true}
                name={lastBun.name}
                price={lastBun.price}
                proteins={lastBun.proteins}
                text={`${lastBun.name} (низ)`}
                thumbnail={lastBun.image_mobile}
                type="bottom"
                typeIngredient={lastBun.type}
            />
        </ul>
    );
};

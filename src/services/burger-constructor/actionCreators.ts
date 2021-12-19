import { IIngredient } from "types/ingredient";
import { ActionTypes } from "./actionTypes";
import {
    IActionAddIngredientBurgerConstructor,
    IActionDeleteIngredientBurgerConstructor,
    IActionMoveIngredientBurgerConstructor,
} from "./types";

export const addIngredient = (
    ingredient: IIngredient
): IActionAddIngredientBurgerConstructor => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        payload: ingredient,
    };
};

export const deleteIngredient = (
    index: number
): IActionDeleteIngredientBurgerConstructor => {
    return {
        type: ActionTypes.DELETE_INGREDIENT,
        payload: index,
    };
};

export const moveIngredients = (
    dragIndex: number,
    hoverIndex: number
): IActionMoveIngredientBurgerConstructor => {
    return {
        type: ActionTypes.MOVE_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
    };
};

import { IIngredient } from "types/ingredient";
import { newGuid } from "utils/guid";
import { ActionTypes } from "./actionTypes";
import {
    IActionAddIngredientBurgerConstructor,
    IActionClearAllIngredientBurgerConstructor,
    IActionDeleteIngredientBurgerConstructor,
    IActionMoveIngredientBurgerConstructor,
} from "./types";

export const addIngredient = (
    ingredient: IIngredient
): IActionAddIngredientBurgerConstructor => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        payload: ingredient,
        uuid: newGuid(),
    };
};

export const deleteIngredient = (
    id: string
): IActionDeleteIngredientBurgerConstructor => {
    return {
        type: ActionTypes.DELETE_INGREDIENT,
        payload: id,
    };
};

export const moveIngredients = (
    state: IIngredient[]
): IActionMoveIngredientBurgerConstructor => {
    return {
        type: ActionTypes.MOVE_INGREDIENTS,
        payload: state,
    };
};

export const clearAllIngredients =
    (): IActionClearAllIngredientBurgerConstructor => {
        return {
            type: ActionTypes.CLEAR_ALL_INGREDIENTS,
        };
    };

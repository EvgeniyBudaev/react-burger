import { IIngredient } from "types/ingredient";
import { ActionTypes } from "./actionTypes";

export interface IActionAddIngredientBurgerConstructor {
    type: ActionTypes.ADD_INGREDIENT;
    payload: IIngredient;
    uuid: string;
}

export interface IActionDeleteIngredientBurgerConstructor {
    type: ActionTypes.DELETE_INGREDIENT;
    payload: string;
}

export interface IActionMoveIngredientBurgerConstructor {
    type: ActionTypes.MOVE_INGREDIENTS;
    payload: IIngredient[];
}

export interface IActionClearAllIngredientBurgerConstructor {
    type: ActionTypes.CLEAR_ALL_INGREDIENTS;
}

export type BurgerConstructorActionsType =
    | IActionAddIngredientBurgerConstructor
    | IActionDeleteIngredientBurgerConstructor
    | IActionMoveIngredientBurgerConstructor
    | IActionClearAllIngredientBurgerConstructor;

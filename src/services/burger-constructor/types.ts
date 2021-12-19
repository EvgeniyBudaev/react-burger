import { IIngredient } from "types/ingredient";
import { ActionTypes } from "./actionTypes";

export interface IActionAddIngredientBurgerConstructor {
    type: ActionTypes.ADD_INGREDIENT;
    payload: IIngredient;
}

export interface IActionDeleteIngredientBurgerConstructor {
    type: ActionTypes.DELETE_INGREDIENT;
    payload: number;
}

export interface IActionMoveIngredientBurgerConstructor {
    type: ActionTypes.MOVE_INGREDIENTS;
    dragIndex: number;
    hoverIndex: number;
}

export type BurgerConstructorActionsType =
    | IActionAddIngredientBurgerConstructor
    | IActionDeleteIngredientBurgerConstructor
    | IActionMoveIngredientBurgerConstructor;

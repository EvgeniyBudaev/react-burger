import { ActionTypes } from "./actionTypes";

export interface IActionHideIngredientDetails {
    type: ActionTypes.HIDE_INGREDIENT_DETAILS;
}

export interface IActionShowIngredientDetails {
    type: ActionTypes.SHOW_INGREDIENT_DETAILS;
    payload: string;
}

export type IngredientDetailsActionsType =
    | IActionHideIngredientDetails
    | IActionShowIngredientDetails;

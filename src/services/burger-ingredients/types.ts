import { ActionTypes } from "services/burger-ingredients";
import { IError } from "types/error";
import { IIngredient } from "types/ingredient";

export interface IActionBurgerIngredientsRequest {
    type: ActionTypes.GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IActionBurgerIngredientsSuccess {
    type: ActionTypes.GET_BURGER_INGREDIENTS_SUCCESS;
    payload: IIngredient[];
}

export interface IActionBurgerIngredientsFailed {
    type: ActionTypes.GET_BURGER_INGREDIENTS_FAILED;
    payload: IError;
}

export type BurgerIngredientsActionsType =
    | IActionBurgerIngredientsRequest
    | IActionBurgerIngredientsSuccess
    | IActionBurgerIngredientsFailed;

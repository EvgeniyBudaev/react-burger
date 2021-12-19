import { ActionTypes } from "./actionTypes";
import {
    IActionHideIngredientDetails,
    IActionShowIngredientDetails,
} from "./types";

export const hideIngredientDetails = (): IActionHideIngredientDetails => {
    return {
        type: ActionTypes.HIDE_INGREDIENT_DETAILS,
    };
};

export const showIngredientDetails = (
    id: string
): IActionShowIngredientDetails => {
    return {
        type: ActionTypes.SHOW_INGREDIENT_DETAILS,
        payload: id,
    };
};

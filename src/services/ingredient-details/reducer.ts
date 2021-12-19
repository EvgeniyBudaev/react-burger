import { Reducer } from "redux";
import { ActionTypes } from "./actionTypes";
import { IngredientDetailsActionsType } from "./types";

interface IIngredientDetailsState {
    ingredientDetailsId: string;
    iSIngredientDetailsActive: boolean;
}

const initialState: IIngredientDetailsState = {
    ingredientDetailsId: "",
    iSIngredientDetailsActive: false,
};

export const reducer: Reducer<
    IIngredientDetailsState,
    IngredientDetailsActionsType
> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                iSIngredientDetailsActive: true,
                ingredientDetailsId: action.payload,
            };
        }
        case ActionTypes.HIDE_INGREDIENT_DETAILS: {
            return {
                ...state,
                iSIngredientDetailsActive: false,
                ingredientDetailsId: "",
            };
        }
        default:
            return state;
    }
};

import { AxiosError } from "axios";
import { Reducer } from "redux";
import { IIngredient } from "types/ingredient";
import {
    ActionTypes,
    BurgerIngredientsActionsType,
} from "services/reducers/burger-ingredients";

interface IBurgerIngredientsState {
    ingredients: IIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    ingredientsError: AxiosError | null;
}

const initialState: IBurgerIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsError: null,
};

export const reducer: Reducer<
    IBurgerIngredientsState,
    BurgerIngredientsActionsType
> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_BURGER_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
                ingredientsError: null,
            };
        }
        case ActionTypes.GET_BURGER_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                ingredientsRequest: false,
            };
        case ActionTypes.GET_BURGER_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredientsError: action.payload,
            };
        default:
            return state;
    }
};

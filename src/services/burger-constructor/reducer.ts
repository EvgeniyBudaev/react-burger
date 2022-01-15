import { INGREDIENT_TYPE } from "constants/ingredient";
import { Reducer } from "redux";
import { IIngredient } from "types/ingredient";
import { ActionTypes } from "./actionTypes";
import { BurgerConstructorActionsType } from "./types";

interface IBurgerConstructorState {
    bun: IIngredient | Record<string, never>;
    mains: IIngredient[];
}

const initialState: IBurgerConstructorState = {
    bun: {},
    mains: [],
};

export const reducer: Reducer<
    IBurgerConstructorState,
    BurgerConstructorActionsType
> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_INGREDIENT: {
            if (action.payload.type === INGREDIENT_TYPE.BUN) {
                return {
                    ...state,
                    bun: action.payload,
                };
            } else
                return {
                    ...state,
                    mains: [
                        ...state.mains,
                        { ...action.payload, id: action.uuid },
                    ],
                };
        }
        case ActionTypes.DELETE_INGREDIENT: {
            return {
                ...state,
                mains: state.mains.filter(item => item.id !== action.payload),
            };
        }
        case ActionTypes.MOVE_INGREDIENTS: {
            return {
                ...state,
                mains: action.payload,
            };
        }
        case ActionTypes.CLEAR_ALL_INGREDIENTS: {
            return {
                bun: {},
                mains: [],
            };
        }
        default:
            return state;
    }
};

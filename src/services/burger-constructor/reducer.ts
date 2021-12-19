import { INGREDIENT_TYPE } from "constants/ingredient";
import { Reducer } from "redux";
import update from "immutability-helper";
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
                    mains: [...state.mains, action.payload],
                };
        }
        case ActionTypes.DELETE_INGREDIENT: {
            return {
                ...state,
                mains: update(state.mains, {
                    $splice: [[action.payload, 1]],
                }),
            };
        }
        case ActionTypes.MOVE_INGREDIENTS: {
            const draggingIngredient = state.mains[action.dragIndex];
            return {
                ...state,
                mains: update(state.mains, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, draggingIngredient],
                    ],
                }),
            };
        }
        default:
            return state;
    }
};

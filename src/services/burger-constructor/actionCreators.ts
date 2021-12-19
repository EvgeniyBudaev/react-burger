import { IIngredient } from "types/ingredient";
import { ActionTypes } from "./actionTypes";

export const addIngredient = (ingredient: IIngredient) => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        payload: ingredient,
    };
};

export const deleteIngredient = (index: number) => {
    return {
        type: ActionTypes.DELETE_INGREDIENT,
        payload: index,
    };
};

export const moveIngredients = (dragIndex: number, hoverIndex: number) => {
    return {
        type: ActionTypes.MOVE_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
    };
};

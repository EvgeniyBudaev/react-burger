import { ActionTypes } from "services/ingredient-details";
import { reducer } from "./reducer";

const initialState = {
    ingredientDetailsId: "",
    iSIngredientDetailsActive: false,
};

describe("ingredient-details reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should handle SHOW_INGREDIENT_DETAILS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.SHOW_INGREDIENT_DETAILS,
                payload: "60d3b41abdacab0026a733c8",
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                iSIngredientDetailsActive: true,
                ingredientDetailsId: "60d3b41abdacab0026a733c8",
            })
        );
    });

    it("should handle HIDE_INGREDIENT_DETAILS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.HIDE_INGREDIENT_DETAILS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                iSIngredientDetailsActive: false,
                ingredientDetailsId: "",
            })
        );
    });
});

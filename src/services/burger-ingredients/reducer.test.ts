import {
    ActionTypes,
    IBurgerIngredientsState,
} from "services/burger-ingredients";
import { reducer } from "./reducer";

const initialState: IBurgerIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsError: null,
};

describe("burger-ingredients reducer", () => {
    it("should return the initial state", () => {
        expect(initialState).toMatchSnapshot();
    });

    it("should handle GET_BURGER_INGREDIENTS_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_BURGER_INGREDIENTS_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                ingredientsRequest: true,
                ingredientsFailed: false,
                ingredientsError: null,
            })
        );
    });

    it("should handle GET_BURGER_INGREDIENTS_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_BURGER_INGREDIENTS_SUCCESS,
                payload: [
                    {
                        calories: 643,
                        carbohydrates: 85,
                        count: 0,
                        _id: "60d3b41abdacab0026a733c8",
                        id: "63d3aca1-7c2d-4f98-a932-7fd94ce4a850",
                        image: "https://code.s3.yandex.net/react/code/meat-03.png",
                        image_large:
                            "https://code.s3.yandex.net/react/code/meat-03-large.png",
                        image_mobile:
                            "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                        fat: 26,
                        name: "Филе Люминесцентного тетраодонтимформа",
                        price: 988,
                        proteins: 44,
                        type: "main",
                        __v: 0,
                    },
                ],
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                ingredientsRequest: false,
                ingredients: [
                    {
                        calories: 643,
                        carbohydrates: 85,
                        count: 0,
                        _id: "60d3b41abdacab0026a733c8",
                        id: "63d3aca1-7c2d-4f98-a932-7fd94ce4a850",
                        image: "https://code.s3.yandex.net/react/code/meat-03.png",
                        image_large:
                            "https://code.s3.yandex.net/react/code/meat-03-large.png",
                        image_mobile:
                            "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                        fat: 26,
                        name: "Филе Люминесцентного тетраодонтимформа",
                        price: 988,
                        proteins: 44,
                        type: "main",
                        __v: 0,
                    },
                ],
            })
        );
    });

    it("should handle GET_BURGER_INGREDIENTS_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_BURGER_INGREDIENTS_FAILED,
                payload: {
                    success: false,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredientsError: {
                    success: false,
                    error: {
                        body: "error body",
                        message: "error message",
                    },
                },
            })
        );
    });
});

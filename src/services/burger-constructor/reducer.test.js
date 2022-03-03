import { ActionTypes } from "services/burger-constructor";
import { reducer } from "./reducer";

const initialState = {
    bun: {},
    mains: [],
};

describe("burger-constructor reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should handle ADD_INGREDIENT", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.ADD_INGREDIENT,
                payload: {
                    calories: 643,
                    carbohydrates: 85,
                    count: 1,
                    _id: "60d3b41abdacab0026a733c7",
                    id: "60d3b41abdacab0026a733c7",
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_large:
                        "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    image_mobile:
                        "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    fat: 26,
                    name: "Флюоресцентная булка R2-D3",
                    price: 988,
                    proteins: 44,
                    type: "bun",
                    __v: 0,
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                bun: {
                    calories: 643,
                    carbohydrates: 85,
                    count: 1,
                    _id: "60d3b41abdacab0026a733c7",
                    id: "60d3b41abdacab0026a733c7",
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_large:
                        "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    image_mobile:
                        "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    fat: 26,
                    name: "Флюоресцентная булка R2-D3",
                    price: 988,
                    proteins: 44,
                    type: "bun",
                    __v: 0,
                },
            })
        );
    });

    it("should handle DELETE_INGREDIENT", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.DELETE_INGREDIENT,
                payload: "60d3b41abdacab0026a733c7",
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                mains: [],
            })
        );
    });

    it("should handle MOVE_INGREDIENTS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.MOVE_INGREDIENTS,
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
                mains: [
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

    it("should handle CLEAR_ALL_INGREDIENTS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.CLEAR_ALL_INGREDIENTS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                bun: {},
                mains: [],
            })
        );
    });
});

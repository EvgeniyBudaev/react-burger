import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    ActionTypes,
    fetchBurgerIngredients,
} from "services/burger-ingredients";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("burger-ingredients async actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("creates GET_BURGER_INGREDIENTS_SUCCESS", () => {
        fetchMock.getOnce("https://norma.nomoreparties.space/api/ingredients", {
            body: {
                data: [
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
                success: true,
            },
            headers: { "content-type": "application/json" },
        });

        const expectedActions = [
            { type: ActionTypes.GET_BURGER_INGREDIENTS_REQUEST },
            {
                type: ActionTypes.GET_BURGER_INGREDIENTS_SUCCESS,
                body: {
                    data: [
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
                    success: true,
                },
            },
        ];
        const store = mockStore({ data: [] });

        return store.dispatch(fetchBurgerIngredients()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

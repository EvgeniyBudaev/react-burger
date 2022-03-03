import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ActionTypes, fetchMakeOrder } from "services/order-details";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("order-details async actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("creates GET_ORDER_DETAILS_SUCCESS", () => {
        fetchMock.postOnce("https://norma.nomoreparties.space/api/orders", {
            body: {
                data: {
                    name: "Флюоресцентный люминесцентный бургер",
                    order: {
                        createdAt: "2022-03-02T09:31:01.935Z",
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
                        name: "Флюоресцентный люминесцентный бургер",
                        number: 10911,
                        owner: {
                            createdAt: "2022-02-16T03:40:08.089Z",
                            email: "ivan@gmail.com",
                            name: "Ivan",
                            updatedAt: "2022-02-16T03:40:08.089Z",
                        },
                        price: 1976,
                        status: "done",
                        updatedAt: "2022-03-02T09:31:02.247Z",
                        _id: "621f395525b9a4001b6e1fed",
                    },
                    success: true,
                },
            },
            headers: { "content-type": "application/json" },
        });

        const expectedActions = [
            { type: ActionTypes.GET_ORDER_DETAILS_REQUEST },
            {
                type: ActionTypes.GET_ORDER_DETAILS_SUCCESS,
                payload: {
                    name: "Флюоресцентный люминесцентный бургер",
                    order: {
                        createdAt: "2022-03-02T09:31:01.935Z",
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
                        name: "Флюоресцентный люминесцентный бургер",
                        number: 10911,
                        owner: {
                            createdAt: "2022-02-16T03:40:08.089Z",
                            email: "ivan@gmail.com",
                            name: "Ivan",
                            updatedAt: "2022-02-16T03:40:08.089Z",
                        },
                        price: 1976,
                        status: "done",
                        updatedAt: "2022-03-02T09:31:02.247Z",
                        _id: "621f395525b9a4001b6e1fed",
                    },
                    success: true,
                },
            },
            { type: ActionTypes.CLEAR_ALL_INGREDIENTS },
            {
                type: ActionTypes.GET_ORDER_DETAILS_FAILED,
                payload: {
                    error: {
                        body: "Не правильные параметры запроса!",
                        message: "Request failed with status code 403",
                    },
                    success: false,
                },
            },
        ];
        const store = mockStore({
            details: {
                name: "",
                order: {
                    createdAt: "",
                    _id: "",
                    ingredients: [],
                    name: "",
                    number: undefined,
                    owner: {
                        createdAt: "",
                        email: "",
                        name: "",
                        updatedAt: "",
                    },
                    status: undefined,
                    updatedAt: "",
                },
                success: false,
            },
            detailsRequest: false,
            detailsFailed: false,
            detailsError: null,
        });

        return store.dispatch(fetchMakeOrder()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

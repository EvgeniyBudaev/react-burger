import { ActionTypes, IOrderDetailsState } from "services/order-details";
import { reducer } from "./reducer";

const initialState: IOrderDetailsState = {
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
};

describe("order-details reducer", () => {
    it("should return the initial state", () => {
        expect(initialState).toMatchSnapshot();
    });

    it("should handle GET_ORDER_DETAILS_REQUEST", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_ORDER_DETAILS_REQUEST,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                detailsRequest: true,
                detailsFailed: false,
                detailsError: null,
            })
        );
    });

    it("should handle GET_ORDER_DETAILS_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_ORDER_DETAILS_SUCCESS,
                payload: {
                    name: "Флюоресцентный люминесцентный бургер",
                    success: true,
                    order: {
                        ingredients: [
                            "60d3b41abdacab0026a733c8",
                            "60d3b41abdacab0026a733c6",
                        ],
                        _id: "621f05d225b9a4001b6e1fb1",
                        owner: {
                            name: "Ivan",
                            email: "ivan@gmail.com",
                            createdAt: "2022-02-16T03:40:08.089Z",
                            updatedAt: "2022-02-16T03:40:08.089Z",
                        },
                        status: "done",
                        name: "Флюоресцентный люминесцентный бургер",
                        createdAt: "2022-03-02T05:51:14.872Z",
                        updatedAt: "2022-03-02T05:51:15.211Z",
                        number: 10908,
                        price: 1976,
                    },
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                detailsRequest: false,
                details: {
                    name: "Флюоресцентный люминесцентный бургер",
                    success: true,
                    order: {
                        ingredients: [
                            "60d3b41abdacab0026a733c8",
                            "60d3b41abdacab0026a733c6",
                        ],
                        _id: "621f05d225b9a4001b6e1fb1",
                        owner: {
                            name: "Ivan",
                            email: "ivan@gmail.com",
                            createdAt: "2022-02-16T03:40:08.089Z",
                            updatedAt: "2022-02-16T03:40:08.089Z",
                        },
                        status: "done",
                        name: "Флюоресцентный люминесцентный бургер",
                        createdAt: "2022-03-02T05:51:14.872Z",
                        updatedAt: "2022-03-02T05:51:15.211Z",
                        number: 10908,
                        price: 1976,
                    },
                },
            })
        );
    });

    it("should handle GET_ORDER_DETAILS_FAILED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.GET_ORDER_DETAILS_FAILED,
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
                detailsRequest: false,
                detailsFailed: true,
                detailsError: {
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

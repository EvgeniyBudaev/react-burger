import { ActionTypes } from "services/orders-history";
import { reducer } from "./reducer";

const initialState = {
    wsOrdersHistoryRequest: false,
    wsOrdersHistoryConnected: false,
    ordersHistory: null,
    ordersHistoryRequest: false,
    ordersHistoryFailed: false,
    error: null,
};

describe("order-details reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should handle WS_ORDERS_HISTORY_CONNECTION_START", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_START,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsOrdersHistoryRequest: true,
                error: null,
            })
        );
    });

    it("should handle WS_ORDERS_HISTORY_CONNECTION_STOP", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_STOP,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsOrdersHistoryConnected: false,
            })
        );
    });

    it("should handle WS_ORDERS_HISTORY_CONNECTION_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsOrdersHistoryConnected: true,
                error: null,
            })
        );
    });

    it("should handle WS_ORDERS_HISTORY_CONNECTION_ERROR", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_ERROR,
                payload: "error message",
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsOrdersHistoryRequest: false,
                error: "error message",
            })
        );
    });

    it("should handle WS_ORDERS_HISTORY_CONNECTION_CLOSED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_ORDERS_HISTORY_CONNECTION_CLOSED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsOrdersHistoryConnected: false,
                error: null,
            })
        );
    });

    it("should handle WS_GET_ORDERS_HISTORY", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_GET_ORDERS_HISTORY,
                payload: {
                    orders: [
                        {
                            _id: "61e7e6726d7cd8001b2d139c",
                            ingredients: [
                                "60d3b41abdacab0026a733cd",
                                "60d3b41abdacab0026a733cf",
                                "60d3b41abdacab0026a733ce",
                                "60d3b41abdacab0026a733c9",
                                "60d3b41abdacab0026a733cb",
                                "60d3b41abdacab0026a733c6",
                            ],
                            status: "done",
                            name: "Краторный бессмертный антарианский традиционный-галактический space био-марсианский бургер",
                            createdAt: "2022-01-19T10:22:42.400Z",
                            updatedAt: "2022-01-19T10:22:42.615Z",
                            number: 8420,
                        },
                    ],
                    success: true,
                    total: 8333,
                    totalToday: 27,
                },
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsOrdersHistoryRequest: false,
                ordersHistory: {
                    ...initialState.data,
                    orders: [
                        {
                            _id: "61e7e6726d7cd8001b2d139c",
                            ingredients: [
                                "60d3b41abdacab0026a733cd",
                                "60d3b41abdacab0026a733cf",
                                "60d3b41abdacab0026a733ce",
                                "60d3b41abdacab0026a733c9",
                                "60d3b41abdacab0026a733cb",
                                "60d3b41abdacab0026a733c6",
                            ],
                            status: "done",
                            name: "Краторный бессмертный антарианский традиционный-галактический space био-марсианский бургер",
                            createdAt: "2022-01-19T10:22:42.400Z",
                            updatedAt: "2022-01-19T10:22:42.615Z",
                            number: 8420,
                        },
                    ],
                    success: true,
                    total: 8333,
                    totalToday: 27,
                },
            })
        );
    });
});

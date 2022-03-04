import { ActionTypes } from "services/feed";
import { reducer } from "./reducer";

const initialState = {
    wsFeedRequest: false,
    wsFeedConnected: false,
    feed: null,
    feedRequest: false,
    feedFailed: false,
    error: null,
};

describe("feed reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it("should handle WS_FEED_CONNECTION_START", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_FEED_CONNECTION_START,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsFeedRequest: true,
                error: null,
            })
        );
    });

    it("should handle WS_FEED_CONNECTION_STOP", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_FEED_CONNECTION_STOP,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsFeedConnected: false,
            })
        );
    });

    it("should handle WS_FEED_CONNECTION_SUCCESS", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_FEED_CONNECTION_SUCCESS,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsFeedConnected: true,
                error: null,
            })
        );
    });

    it("should handle WS_FEED_CONNECTION_ERROR", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_FEED_CONNECTION_ERROR,
                payload: "error message",
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsFeedRequest: false,
                error: "error message",
            })
        );
    });

    it("should handle WS_FEED_CONNECTION_CLOSED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_FEED_CONNECTION_CLOSED,
            })
        ).toEqual(
            expect.objectContaining({
                ...initialState,
                wsFeedConnected: false,
                error: null,
            })
        );
    });

    it("should handle WS_GET_FEED", () => {
        expect(
            reducer(initialState, {
                type: ActionTypes.WS_GET_FEED,
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
                wsFeedRequest: false,
                feed: {
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

import { Reducer } from "redux";
import { ActionTypes, OrderDetailsActionsType } from "services/order-details";
import { IOrderDetails } from "types/order";
import { IError } from "types/error";

export interface IOrderDetailsState {
    details: IOrderDetails;
    detailsRequest: boolean;
    detailsFailed: boolean;
    detailsError: IError | null;
}

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

export const reducer: Reducer<IOrderDetailsState, OrderDetailsActionsType> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionTypes.GET_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                detailsRequest: true,
                detailsFailed: false,
                detailsError: null,
            };
        }
        case ActionTypes.GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                details: action.payload,
                detailsRequest: false,
            };
        case ActionTypes.GET_ORDER_DETAILS_FAILED:
            return {
                ...state,
                detailsRequest: false,
                detailsFailed: true,
                detailsError: action.payload,
            };
        default:
            return state;
    }
};

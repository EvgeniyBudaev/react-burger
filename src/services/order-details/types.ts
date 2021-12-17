import { AxiosError } from "axios";
import { ActionTypes } from "services/order-details";
import { IOrderDetails } from "types/order";

export interface IActionOrderDetailsRequest {
    type: ActionTypes.GET_ORDER_DETAILS_REQUEST;
}

export interface IActionOrderDetailsSuccess {
    type: ActionTypes.GET_ORDER_DETAILS_SUCCESS;
    payload: IOrderDetails;
}

export interface IActionOrderDetailsFailed {
    type: ActionTypes.GET_ORDER_DETAILS_FAILED;
    payload: AxiosError;
}

export type OrderDetailsActionsType =
    | IActionOrderDetailsRequest
    | IActionOrderDetailsSuccess
    | IActionOrderDetailsFailed;

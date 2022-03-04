import { BASE_URL } from "constants/routes";
import axios, { AxiosError } from "axios";
import { ActionTypes } from "services/order-details";
import { ActionTypes as ActionTypesBurgerConstructor } from "services/burger-constructor";
import { AppDispatch, AppThunk } from "services/types";
import { IOrderDetails } from "types/order";
import { getCookie } from "utils/coockie";
import { getErrorByStatus } from "utils/error";

export interface IOrderDetailsRequest {
    ingredients: string[];
}

const ORDER_DETAILS_URL = `${BASE_URL}orders`;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export const fetchMakeOrder: AppThunk =
    (options: IOrderDetailsRequest) => async (dispatch: AppDispatch) => {
        try {
            const config = {
                headers: {
                    ...headers,
                    authorization: `Bearer ${getCookie("accessToken")}`,
                },
            };
            const body = JSON.stringify(options);
            dispatch({ type: ActionTypes.GET_ORDER_DETAILS_REQUEST });
            const response = await axios.post<IOrderDetails>(
                ORDER_DETAILS_URL,
                body,
                config
            );
            console.log("response:", response);
            dispatch({
                type: ActionTypes.GET_ORDER_DETAILS_SUCCESS,
                payload: response.data,
            });
            dispatch({
                type: ActionTypesBurgerConstructor.CLEAR_ALL_INGREDIENTS,
            });
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.GET_ORDER_DETAILS_FAILED,
                payload: errorByStatus,
            });
        }
    };

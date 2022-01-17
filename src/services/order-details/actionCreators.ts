import { BASE_URL } from "constants/routes";
import axios from "axios";
import { ActionTypes } from "services/order-details";
import { IIngredient } from "types/ingredient";

export interface ISearchResponse {
    data: IIngredient[];
}

export interface IOrderDetailsRequest {
    ingredients: string[];
}

const ORDER_DETAILS_URL = `${BASE_URL}orders`;

export const fetchMakeOrder =
    (options: IOrderDetailsRequest): ((dispatch) => Promise<void>) =>
    async dispatch => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify(options);
            dispatch({ type: ActionTypes.GET_ORDER_DETAILS_REQUEST });
            const { data } = await axios.post<ISearchResponse>(
                ORDER_DETAILS_URL,
                body,
                config
            );
            dispatch({
                type: ActionTypes.GET_ORDER_DETAILS_SUCCESS,
                payload: data,
            });
            dispatch({
                type: ActionTypes.CLEAR_ALL_INGREDIENTS,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.GET_ORDER_DETAILS_FAILED,
                payload: error,
            });
        }
    };

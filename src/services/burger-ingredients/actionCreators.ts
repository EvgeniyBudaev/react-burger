import { BASE_URL } from "constants/routes";
import axios, { AxiosError } from "axios";
import { ActionTypes } from "services/burger-ingredients";
import { AppDispatch, AppThunk } from "services/types";
import { IIngredient } from "types/ingredient";
import { getErrorByStatus } from "utils/error";

export interface ISearchResponse {
    data: IIngredient[];
}

const INGREDIENTS_URL = `${BASE_URL}ingredients`;

export const fetchBurgerIngredients: AppThunk =
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: ActionTypes.GET_BURGER_INGREDIENTS_REQUEST });
            const { data } = await axios.get<ISearchResponse>(INGREDIENTS_URL);
            dispatch({
                type: ActionTypes.GET_BURGER_INGREDIENTS_SUCCESS,
                payload: data.data,
            });
        } catch (e) {
            const error = e as AxiosError;
            const errorByStatus = getErrorByStatus(error);
            dispatch({
                type: ActionTypes.GET_BURGER_INGREDIENTS_FAILED,
                payload: errorByStatus,
            });
        }
    };

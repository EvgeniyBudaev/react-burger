import { BASE_URL } from "constants/routes";
import axios from "axios";
import { ActionTypes } from "services/reducers/burger-ingredients";
import { IIngredient } from "types/ingredient";

export interface ISearchResponse {
    data: IIngredient[];
}

const INGREDIENTS_URL = `${BASE_URL}ingredients`;

export const fetchBurgerIngredients =
    (): ((dispatch) => Promise<void>) => async dispatch => {
        try {
            dispatch({ type: ActionTypes.GET_BURGER_INGREDIENTS_REQUEST });
            const { data } = await axios.get<ISearchResponse>(INGREDIENTS_URL);
            dispatch({
                type: ActionTypes.GET_BURGER_INGREDIENTS_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.GET_BURGER_INGREDIENTS_FAILED,
                payload: error,
            });
        }
    };

import { BASE_URL } from "constants/routes";
import axios from "axios";
import { IIngredient } from "types/ingredient";

export interface ISearchResponse {
    data: IIngredient[];
}

const INGREDIENTS_URL = `${BASE_URL}ingredients`;

export const fetchBurgerIngredients = async (): Promise<ISearchResponse> => {
    const response = await axios.get<ISearchResponse>(INGREDIENTS_URL);
    return response.data;
};

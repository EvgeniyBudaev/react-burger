import axios from "axios";
import { IIngredient } from "types/ingredient";

export interface ISearchResponse {
    data: IIngredient[];
}

const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

export const fetchBurgerIngredients = async (): Promise<ISearchResponse> => {
    const response = await axios.get<ISearchResponse>(INGREDIENTS_URL);
    return response.data;
};

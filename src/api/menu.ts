import axios from "axios";
import { IIngredient } from "types/ingredient";

export interface ISearchResponse {
    data: IIngredient[];
}

const baseUrl = "https://norma.nomoreparties.space/api/ingredients";

export const fetchBurgerIngredients = async (): Promise<ISearchResponse> => {
    const response = await axios.get<ISearchResponse>(baseUrl);
    return response.data;
};

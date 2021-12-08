import axios, { AxiosResponse } from "axios";
import { IIngredient } from "types/ingredient";

export interface ISearchResponse {
    data: IIngredient[];
}

const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";

export const fetchBurgerIngredients = (): Promise<AxiosResponse> => {
    return axios
        .get<ISearchResponse>(INGREDIENTS_URL)
        .then(response => response.data)
        .catch(error => error);
};

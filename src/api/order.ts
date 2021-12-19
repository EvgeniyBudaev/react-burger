import { BASE_URL } from "constants/routes";
import axios from "axios";
import { IOrderDetails } from "types/order";

export interface IOrderDetailsRequest {
    ingredients: string[];
}

const ORDER_URL = `${BASE_URL}orders`;

export const fetchMakeOrder = async (
    options: IOrderDetailsRequest
): Promise<IOrderDetails> => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify(options);
    const response = await axios.post<IOrderDetails>(ORDER_URL, body, config);
    return response.data;
};

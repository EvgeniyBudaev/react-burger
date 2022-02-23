import { IOrder } from "types/order";

export type TFeed = {
    orders: IOrder[];
    success: boolean;
    total: number;
    totalToday: number;
};

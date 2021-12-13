export interface IOrder {
    number: number;
}

export interface IOrderDetails {
    name: string;
    order: IOrder;
    success: boolean;
}

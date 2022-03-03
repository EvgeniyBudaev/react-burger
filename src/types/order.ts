export interface IOwner {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
}

export interface IOrder {
    createdAt: string;
    _id: string;
    ingredients: string[];
    name: string;
    number?: number;
    owner: IOwner;
    price?: number;
    status?: "created" | "pending" | "done";
    updatedAt: string;
}

export interface IOrderDetails {
    name: string;
    order: IOrder;
    success: boolean;
}

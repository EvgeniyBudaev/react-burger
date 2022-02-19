import { IIngredient } from "types/ingredient";
import { IOrder } from "types/order";

export const getOrderIngredients = (
    ingredients: string[],
    allIngredients: IIngredient[]
): IIngredient[] => {
    return ingredients
        .map((id: string) =>
            allIngredients.filter((item: IIngredient) => item._id === id)
        )
        .flat();
};

export const getOrderNumbers = (
    orders: IOrder[]
): { done: number[]; pending: number[] } => {
    return orders.slice(0, 30).reduce(
        (acc: { done: number[]; pending: number[] }, current: IOrder) => {
            if (current.number != null) {
                current.status === "done"
                    ? acc.done.push(current.number)
                    : acc.pending.push(current.number);
            }
            return acc;
        },
        { done: [], pending: [] }
    );
};

export const getOrderPrice = (ingredients: IIngredient[]): number => {
    return ingredients.reduce(
        (acc: number, current: IIngredient) =>
            current.type === "bun"
                ? 2 * current.price + acc
                : acc + current.price,
        0
    );
};

export const getQuantityIngredients = (
    ingredients: string[]
): { [p: string]: number } => {
    const ingredientsWithCounter = {};
    ingredients.reduce((acc: { [key: string]: number }, el: string) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, ingredientsWithCounter);
    return ingredientsWithCounter;
};

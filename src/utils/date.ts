import { IOrder } from "types/order";

const whenWasOrderCreated = (date: Date, orderDate: Date): string => {
    const dateNum = Date.parse(date.toISOString().slice(0, 10));
    const orderDateNum = Date.parse(orderDate.toISOString().slice(0, 10));
    return dateNum - orderDateNum === 0
        ? "Сегодня, "
        : (dateNum - orderDateNum) / 86400000 === 1
        ? "Вчера, "
        : `${(dateNum - orderDateNum) / 86400000} "дня(ей) назад, "`;
};

export const getOrderDate = (order: IOrder): string => {
    if (order) {
        const date = new Date();
        const orderDate = new Date(order.createdAt);
        const hours =
            orderDate.getHours() > 9
                ? `${orderDate.getHours()}`
                : `0${orderDate.getHours()}`;
        const minutes =
            orderDate.getMinutes() > 9
                ? `${orderDate.getMinutes()}`
                : `0${orderDate.getMinutes()}`;

        return `${whenWasOrderCreated(
            date,
            orderDate
        )} ${hours}:${minutes} i-GMT+${
            (orderDate.getTimezoneOffset() * -1) / 60
        }`;
    } else return "";
};

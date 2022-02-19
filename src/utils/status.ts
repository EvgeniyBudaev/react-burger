export const getOrderStatus = (
    status: string,
    style: { [key: string]: string }
): { colorStatus: string; nameStatus: string } => {
    return status === "done"
        ? { nameStatus: "Выполнен", colorStatus: style.doneColor }
        : status === "pending"
        ? { nameStatus: "Готовится", colorStatus: style.pendingColor }
        : { nameStatus: "Отменён", colorStatus: style.cancelledColor };
};

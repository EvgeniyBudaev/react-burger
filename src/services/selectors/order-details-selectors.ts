import { createSelector } from "reselect";
import { RootState } from "services/types";

export const orderDetailsSelector = createSelector(
    (state: RootState) => state.orderDetails,
    orderDetails => orderDetails
);

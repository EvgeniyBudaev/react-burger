import { createSelector } from "reselect";
import { RootState } from "services/types";

export const ordersHistorySelector = createSelector(
    (state: RootState) => state.ordersHistory,
    ordersHistory => ordersHistory
);

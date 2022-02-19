import { createSelector } from "reselect";
import { RootState } from "services/types";

export const accountSelector = createSelector(
    (state: RootState) => state.account,
    account => account
);

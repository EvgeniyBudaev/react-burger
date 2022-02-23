import { createSelector } from "reselect";
import { RootState } from "services/types";

export const feedSelector = createSelector(
    (state: RootState) => state.feed,
    feed => feed
);

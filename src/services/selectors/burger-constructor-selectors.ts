import { createSelector } from "reselect";
import { RootState } from "services/types";

export const burgerConstructorSelector = createSelector(
    (state: RootState) => state.burgerConstructor,
    burgerConstructor => burgerConstructor
);

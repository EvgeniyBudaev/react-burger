import { createSelector } from "reselect";
import { RootState } from "services/types";

export const burgerIngredientsSelector = createSelector(
    (state: RootState) => state.burgerIngredients,
    burgerIngredients => burgerIngredients
);

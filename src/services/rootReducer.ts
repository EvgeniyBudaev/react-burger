import { combineReducers } from "redux";
import { reducer as burgerIngredients } from "services/reducers/burger-ingredients";

export const rootReducer = combineReducers({
    burgerIngredients,
});

export type RootState = ReturnType<typeof rootReducer>;

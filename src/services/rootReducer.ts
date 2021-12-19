import { combineReducers } from "redux";
import { reducer as burgerConstructor } from "services/burger-constructor";
import { reducer as burgerIngredients } from "services/burger-ingredients";
import { reducer as ingredientDetails } from "services/ingredient-details";
import { reducer as orderDetails } from "services/order-details";

export const rootReducer = combineReducers({
    burgerConstructor,
    burgerIngredients,
    ingredientDetails,
    orderDetails,
});

export type RootState = ReturnType<typeof rootReducer>;

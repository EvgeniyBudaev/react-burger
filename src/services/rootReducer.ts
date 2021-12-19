import { combineReducers } from "redux";
import { reducer as burgerConstructor } from "services/burger-constructor";
import { reducer as burgerIngredients } from "services/burger-ingredients";
import { reducer as orderDetails } from "services/order-details";

export const rootReducer = combineReducers({
    burgerConstructor,
    burgerIngredients,
    orderDetails,
});

export type RootState = ReturnType<typeof rootReducer>;

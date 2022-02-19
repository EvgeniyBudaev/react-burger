import { combineReducers } from "redux";
import { reducer as account } from "services/account";
import { reducer as burgerConstructor } from "services/burger-constructor";
import { reducer as burgerIngredients } from "services/burger-ingredients";
import { reducer as ingredientDetails } from "services/ingredient-details";
import { reducer as feed } from "services/feed";
import { reducer as orderDetails } from "services/order-details";
import { reducer as ordersHistory } from "services/orders-history";

export const rootReducer = combineReducers({
    account,
    burgerConstructor,
    burgerIngredients,
    ingredientDetails,
    feed,
    orderDetails,
    ordersHistory,
});

import { combineReducers } from "redux";
import { loginReducres } from "./loginReducer";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import { buyProductData } from "./buyProduct";
import { onlyUserBuyProduct } from "./onlyUserProduct";
import { wallteReducer } from "./walletReducer";
import { transactionReducer } from "./transactionReducer";

export const rootReducers = combineReducers({
    login:loginReducres,
    user:userReducer,
    product:productReducer,
    buyProduct:buyProductData,
    userProduct:onlyUserBuyProduct,
    wallet:wallteReducer,
    transaction:transactionReducer
})
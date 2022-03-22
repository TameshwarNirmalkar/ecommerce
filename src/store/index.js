import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import products from "./slices/productSlice";

const reducer = combineReducers({ user, products });

const Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});

export default Store;

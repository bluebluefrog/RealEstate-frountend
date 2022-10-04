import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {recommendProductsSlice} from "./recommendProducts/slice";
import {productSearchSlice} from "./productSearch/slice";
import {propertyDetailSlice} from "./productDetail/slice";

const rootReducer = combineReducers({
    recommendProducts: recommendProductsSlice.reducer,
    productSearch: productSearchSlice.reducer,
    propertyDetail:propertyDetailSlice.reducer

})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>

export default store;
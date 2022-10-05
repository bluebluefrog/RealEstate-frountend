import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {recommendProductsSlice} from "./recommendProducts/slice";
import {productSearchSlice} from "./productSearch/slice";
import {propertyDetailSlice} from "./productDetail/slice";
import {userSlice} from "./user/slice";
import {auctionHistorySlice} from "./auctionHistory/slice";

const rootReducer = combineReducers({
    recommendProducts: recommendProductsSlice.reducer,
    productSearch: productSearchSlice.reducer,
    propertyDetail:propertyDetailSlice.reducer,
    user: userSlice.reducer,
    auctionHistory: auctionHistorySlice.reducer,

})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>

export default store;
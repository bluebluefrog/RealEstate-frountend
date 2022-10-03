import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {recommendProductsSlice} from "./recommendProducts/slice";

const rootReducer = combineReducers({
    recommendProducts: recommendProductsSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>

export default store;
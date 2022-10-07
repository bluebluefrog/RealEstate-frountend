import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface ProductNoAuctionState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductNoAuctionState = {
  loading: true,
  error: null,
  data: null,
};


export const searchNoAuctionProduct = createAsyncThunk(
    "productNoAuction/searchNoAuctionProduct",
    async (
        thunkAPI
    ) => {
      let url = port+`property/listNoAuction`;
      const response = await axios.get(url);
      console.log(response.data.data)
      return {
        data: response.data.data,
      };
    }
);

export const productNoAuctionSlice = createSlice({
  name: "productNoAuction",
  initialState,
  reducers: {},
  extraReducers: {

    [searchNoAuctionProduct.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [searchNoAuctionProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [searchNoAuctionProduct.rejected.type]: (
        state,
        action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

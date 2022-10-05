import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface AuctionHistoryState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: AuctionHistoryState = {
  loading: true,
  error: null,
  data: null,
};

export const getAuctionHistory = createAsyncThunk(
  "auctionHistory/getAuctionHistory",
  async (thunkAPI) => {
    const {data} = await axios.get(
        port + `auction/getAuctionInfo`,
    );
    return data.data;
  }
);

export const auctionHistorySlice = createSlice({
  name: "auctionHistory",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getAuctionHistory.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getAuctionHistory.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getAuctionHistory.rejected.type]: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  }
});

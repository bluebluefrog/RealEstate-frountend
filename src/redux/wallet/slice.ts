import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface WalletState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: WalletState = {
  loading: true,
  error: null,
  data: null,
};

export const getWalletList = createAsyncThunk(
    "wallet/getWalletList",
    async (thunkAPI) => {
      let url = port+`wallet/getWallet`;
      const response = await axios.get(url);
      return response.data.data;
    }
);

export const deleteWallet = createAsyncThunk(
    "wallet/deleteWallet",
    async (
        paramters:{bankAccount:string},
           thunkAPI) => {
      let url = port+`wallet/deleteWallet?bankAccount=${paramters.bankAccount}`;
      const response = await axios.post(url);
      return response.data;
    }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: {
    [getWalletList.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getWalletList.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getWalletList.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

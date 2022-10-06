import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface WatchListState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: WatchListState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

export const getWatchList = createAsyncThunk(
    "watchList/getWatchList",
    async (paramaters: {
      nextPage: number,
      pageSize: number,
    },thunkAPI) => {
      let url = port+`watchList/getList?page=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
      const response = await axios.get(url);
      console.log(response.data.data)
      return {
        data: response.data.data.rows,
        pagination: response.data.data,
      };
    }
);

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {},
  extraReducers: {
    [getWatchList.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getWatchList.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    [getWatchList.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

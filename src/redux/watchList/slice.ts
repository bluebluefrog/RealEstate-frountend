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
      return {
        data: response.data.data.rows,
        pagination: response.data.data,
      };
    }
);

export const addWatchList = createAsyncThunk(
    "watchList/addWatchList",
    async (paramaters: {
      realEstateId: string,
    },thunkAPI) => {
      let url = port+`watchList/addList?realEstateId=${paramaters.realEstateId}`;
      const response = await axios.post(url);
      return {
        data: response.data,
      };
    }
);

export const deleteWatchList = createAsyncThunk(
    "watchList/deleteWatchList",
    async (paramaters: {
      realEstateId: string,
    },thunkAPI) => {
      let url = port+`watchList/deleteList?realEstateId=${paramaters.realEstateId}`;
      const response = await axios.post(url);
      return {
        data: response.data,
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
      console.log(2)
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

    [addWatchList.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [addWatchList.fulfilled.type]: (state, action) => {
      console.log(1)
      if(action.payload.data.status==200){
        alert("added to watchList")
        state.loading = false;
        state.error = null;
      }else{
        alert(action.payload.data.msg)
        state.loading = false;
        state.error = null;
      }
    },
    [addWatchList.rejected.type]: (
        state,
        action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },

    [deleteWatchList.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [deleteWatchList.fulfilled.type]: (state, action) => {
      if(action.payload.data.status==200) {
        alert("deleted from watchList")
        state.loading = false;
        state.error = null;
      }else{
        alert(action.payload.data.msg)
        state.loading = false;
        state.error = null;
    }
    },
    [deleteWatchList.rejected.type]: (
        state,
        action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

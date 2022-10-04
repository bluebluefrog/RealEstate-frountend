import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface PropertyDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: PropertyDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getPropertyDetail = createAsyncThunk(
  "propertyDetail/getPropertyDetail",
  async (propertyId: string, thunkAPI) => {
    const {data} = await axios.get(
        port + `property/info?realEstateId=${propertyId}`
    );
    console.log(data.data)
    return data.data;
  }
);

export const propertyDetailSlice = createSlice({
  name: "propertyDetail",
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [getPropertyDetail.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getPropertyDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getPropertyDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  }
});

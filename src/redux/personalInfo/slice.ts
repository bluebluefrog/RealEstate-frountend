import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface PersonalInfoState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: PersonalInfoState = {
  loading: true,
  error: null,
  data: null,
};

export const getPersonalInfo = createAsyncThunk(
  "personalInfo/getPersonalInfo",
  async (
    thunkAPI
  ) => {
    let url = port+"account/personInfo";
    const response = await axios.get(url);
    console.log(response.data.data)
    return {
      data: response.data.data,
    };
  }
);

export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {},
  extraReducers: {
    [getPersonalInfo.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getPersonalInfo.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [getPersonalInfo.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

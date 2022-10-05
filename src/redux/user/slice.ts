import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface UserState {
  loading: boolean;
  error: string | null;
  userInfo: any | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (paramaters: {
      email: string,
      password: string,
  }, thunkAPI) => {
    const {data} = await axios.get(
        port + `/account/login?username=${paramaters.email}&password=${paramaters.password}`,
    );
    return data;
  }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (thunkAPI) => {
      const {data} = await axios.get(
          port + `/account/logout`,
      );
      return data;
    }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      if (action.payload.status == 200) {
        state.userInfo = action.payload.data;
        state.loading = false;
        state.error = null;
      } else {
        alert(action.payload.msg);
        state.userInfo = null;
        state.error = null;
        state.loading = false;
      }
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },

    [logout.pending.type]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled.type]: (state, action) => {
      if (action.payload.status == 200) {
        state.userInfo = null;
        state.loading = false;
        state.error = null;
      } else {
        alert(action.payload.msg);
        state.error = null;
        state.loading = false;
      }
    },
    [logout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {port} from "../../AppConfig";

interface RecommendProductsState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: RecommendProductsState = {
    loading: true,
    error: null,
    data: null,
};

export const getRecommendProducts = createAsyncThunk(
    "recommendProducts/getRecommendProducts",
    async (params: {
        page:number,
        pageSize:number,
        keyWord: string;
    }, thunkAPI) => {
        let url = port+`property/list?page=${params.page}&pageSize=${params.pageSize}&keyWord=`;
        if (params.keyWord) {
            url += params.keyWord;
        }
        const {data} = await axios.get(url);
        const finalData = data.data;

        console.log(finalData);

        return finalData;
    }
);

export const recommendProductsSlice = createSlice({
    name: "recommendProducts",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getRecommendProducts.pending.type]: (state) => {
            // return { ...state, loading: true };
            state.loading = true;
        },
        [getRecommendProducts.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getRecommendProducts.rejected.type]: (state, action: PayloadAction<string | null>) => {
            //   const ddd = action.payload;
            state.loading = false;
            state.error = action.payload;
        },
    }
});
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ArticleRoom } from "../../ts";
import axios from "axios";

type ArticlesState = {
  articles: {
    items: ArticleRoom[];
    lengthItems: number;
  };
};

const initialState: ArticlesState = {
  articles: {
    items: [],
    lengthItems: 0,
  },
};

export const articlesThunk = createAsyncThunk(
  "articles/articlesMenu",
  async (interval: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/get-articles/",
        {
          params: { interval },
        }
      );
      return data;
    } catch (error: any) {
      let response: string = error.response.data;
      return rejectWithValue(response);
    }
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      articlesThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.articles = action.payload;
      }
    );
    builder.addCase(articlesThunk.rejected, (state) => {
      state.articles.items = [];
    });
  },
});

export default articlesSlice.reducer;

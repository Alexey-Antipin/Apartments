import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../ts";
import axios from "axios";

export type newsState = {
  item: Article[];
  list: Article[];
};

const initialState: newsState = {
  list: [],
  item: [],
};

export const newsThunk = createAsyncThunk("news/newsList", async () => {
  let id: number = 1;
  let rangeMin: number = id - 1;
  let rangeMax: number = rangeMin + 4;

  let { data } = await axios.get<Article[]>(
    "http://localhost:3000/api/articles",
    {
      params: { rangeMin, rangeMax },
    }
  );

  const articles = data.slice(rangeMin, rangeMax);

  const item = articles.filter((el) => el.id == id.toString());

  const list = data.slice(rangeMin + 1, rangeMax);

  return { list, item };
});

export const newsSlice= createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      newsThunk.fulfilled,
      (state, action: PayloadAction<newsState>) => {
        state.list = action.payload.list;
        state.item = action.payload.item;
      }
    );
  },
});
export default newsSlice.reducer;

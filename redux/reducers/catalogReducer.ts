import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleRoom } from "../../ts";

type PayloadCity = {
  articles: ArticleRoom[];
  currentPage: number;
  totalData: number;
};

type ArticlesState = {
  recommendedRooms: string[];
  articles: ArticleRoom[];
  currentPage: number;
  totalData: number;
};

const initialState: ArticlesState = {
  recommendedRooms: [
    "Недорогие",
    "1-комнатные",
    "2-комнатные",
    "3-комнатные",
    "4-комнатные",
    "5-комнатные",
    "Заводской р.",
    "Ленинский р.",
    "Московский р.",
    "Октябрьский р.",
    "Партизанский р.",
    "Первомайский р.",
    "Советский р.",
    "Фрунзенский р.",
    "Центральный р.",
  ],
  articles: [],
  currentPage: 0,
  totalData: 0,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    choiceCity(state, action: PayloadAction<PayloadCity>) {
      state.currentPage = action.payload.currentPage;
      state.totalData = action.payload.totalData;
      state.articles = action.payload.articles;
    },
  },
});

export const { choiceCity } = catalogSlice.actions;
export default catalogSlice.reducer;

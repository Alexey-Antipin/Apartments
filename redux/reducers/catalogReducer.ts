import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleRoom } from "../../ts";

type ObjectOfRooms = {
  word: string;
  view: string;
  num?: number;
};

type PayloadCity = {
  articles: ArticleRoom[];
  currentPage: number;
  totalData: number;
};

type ArticlesState = {
  recommendedRooms: ObjectOfRooms[];
  articles: ArticleRoom[];
  currentPage: number;
  totalData: number;
};

const initialState: ArticlesState = {
  recommendedRooms: [
    { word: "Недорогие", view: "price" },
    { word: "1-комнатные", view: "room", num: 1 },
    { word: "2-комнатные", view: "room", num: 2 },
    { word: "3-комнатные", view: "room", num: 3 },
    { word: "4-комнатные", view: "room", num: 4 },
    { word: "5-комнатные", view: "room", num: 5 },
    { word: "Заводской р.", view: "area" },
    { word: "Ленинский р.", view: "area" },
    { word: "Московский р.", view: "area" },
    { word: "Октябрьский р.", view: "area" },
    { word: "Партизанский р.", view: "area" },
    { word: "Первомайский р.", view: "area" },
    { word: "Советский р.", view: "area" },
    { word: "Фрунзенский р.", view: "area" },
    { word: "Центральный р.", view: "area" },
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

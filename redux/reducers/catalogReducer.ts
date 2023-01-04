import { createSlice } from "@reduxjs/toolkit";

type ArticlesState = {
  recommendedRooms: string[];
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
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
});

export default catalogSlice.reducer;

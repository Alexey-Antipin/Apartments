import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectState = {
  priceMin: string;
  priceMax: string;
  rooms: string;
  city: string;
};

const initialState: SelectState = {
  priceMin: "",
  priceMax: "",
  rooms: "",
  city: "",
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    selectCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    selectCountRooms(state, action: PayloadAction<string>) {
      state.rooms = action.payload;
    },
    selectPriceMin(state, action: PayloadAction<string>) {
      state.priceMin = action.payload;
    },
    selectPriceMax(state, action: PayloadAction<string>) {
      state.priceMax = action.payload;
    },
  },
});

export const {
  selectCity,
  selectCountRooms,
  selectPriceMin,
  selectPriceMax,
} = selectSlice.actions;

export default selectSlice.reducer;

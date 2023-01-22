import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SelectState = {
  filter: {
    priceMin: string;
    priceMax: string;
    places: string;
    rooms: number;
    city: number;
    metro: string;
    area: string;
  };
  mainPage: {
    metro: string;
    area: string;
  };
};

const initialState: SelectState = {
  filter: {
    priceMax: "",
    priceMin: "",
    places: "",
    metro: "",
    area: "",
    rooms: 0,
    city: 0,
  },
  mainPage: {
    metro: "",
    area: "",
  },
};

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    // Фильтр
    selectCity(state, action: PayloadAction<number>) {
      state.filter.city = action.payload;
    },
    selectCountRooms(state, action: PayloadAction<number>) {
      state.filter.rooms = action.payload;
    },
    selectPriceMin(state, action: PayloadAction<string>) {
      state.filter.priceMin = action.payload;
    },
    selectPriceMax(state, action: PayloadAction<string>) {
      state.filter.priceMax = action.payload;
    },
    selectMetro(state, action: PayloadAction<string>) {
      state.filter.metro = action.payload;
    },
    selectArea(state, action: PayloadAction<string>) {
      state.filter.area = action.payload;
    },
    selectPlaces(state, action: PayloadAction<string>) {
      state.filter.places = action.payload;
    },
    defaultPrice(state) {
      state.filter.priceMax = "10000";
      state.filter.priceMin = "0";
      state.filter.places = "";
      state.filter.metro = "";
      state.filter.area = "";
      state.filter.rooms = 0;
    },
    
    // Главная страница, фильтр для слайда
    selectMetroMainPage(state, action: PayloadAction<string>) {
      state.mainPage.metro = action.payload;
    },
    selectAreaMainPage(state, action: PayloadAction<string>) {
      state.mainPage.area = action.payload;
    },
  },
});

export const {
  selectMetroMainPage,
  selectAreaMainPage,
  selectCountRooms,
  selectPriceMin,
  selectPriceMax,
  selectPlaces,
  defaultPrice,
  selectMetro,
  selectCity,
  selectArea,
} = selectSlice.actions;

export default selectSlice.reducer;

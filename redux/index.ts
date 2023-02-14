import { checkbox, toogleBox, reset } from "./reducers/checkboxReducer";
import { newsThunk, countNewsThunk } from "./reducers/newsReducer";
import { amountOfRoomsThunk } from "./reducers/mainReducer";
import { articlesThunk } from "./reducers/articlesReducer";
import { choiceCity } from "./reducers/catalogReducer";
import {
  authorizationThunk,
  accountUser,
  accountDelete,
} from "./reducers/authorizationReducer";
import {
  redistrationThunk,
  confirmDataThunk,
  toggleCaptcha,
  captchaThunk,
} from "./reducers/registrationReducer";
import {
  contactsThunk,
  closeModal,
  openModal,
} from "./reducers/contactsReducer";
import {
  selectMetroMainPage,
  selectAreaMainPage,
  selectCountRooms,
  selectCallCity,
  selectPriceMin,
  selectPriceMax,
  selectPlaces,
  defaultPrice,
  selectMetro,
  selectCity,
  selectArea,
} from "./reducers/selectReducer";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import type { RootState, AppDispatch } from "./store";

export {
  // Thunk
  authorizationThunk,
  amountOfRoomsThunk,
  redistrationThunk,
  confirmDataThunk,
  countNewsThunk,
  articlesThunk,
  contactsThunk,
  captchaThunk,
  newsThunk,

  // Method
  selectMetroMainPage,
  selectAreaMainPage,
  selectCountRooms,
  selectPriceMin,
  selectPriceMax,
  selectCallCity,
  accountDelete,
  toggleCaptcha,
  selectPlaces,
  defaultPrice,
  selectMetro,
  accountUser,
  selectCity,
  selectArea,
  choiceCity,
  closeModal,
  toogleBox,
  openModal,
  checkbox,
  reset,

  // Hooks
  useAppDispatch,
  useAppSelector,

  //Type Store
  AppDispatch,
  RootState,
};

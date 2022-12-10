import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "../reducers/authorizationReducer";
import registrationSlice from "../reducers/registrationReducer";
import contactsSlice from "../reducers/contactsReducer";
import mainSlice from "./../reducers/mainReducer";
import newsSlice from "../reducers/newsReducer";

export const store = configureStore({
  reducer: {
    authorization: authorizationSlice,
    registration: registrationSlice,
    contacts: contactsSlice,
    main: mainSlice,
    news: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

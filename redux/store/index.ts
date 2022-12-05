import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "../reducers/authorizationReducer";
import registrationSlice from "../reducers/registrationReducer";
import contactsSlice from "../reducers/contactsReducer";
import newsSlice from "../reducers/newsReducer";

export const store = configureStore({
  reducer: {
    authorization: authorizationSlice,
    registration: registrationSlice,
    contacts: contactsSlice,
    news: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

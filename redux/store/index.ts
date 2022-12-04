import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "../reducers/authorizationReducer";
import contactsSlice from "../reducers/contactsReducer";

export const store = configureStore({
  reducer: {
    authorization: authorizationSlice,
    contacts: contactsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

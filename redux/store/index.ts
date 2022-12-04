import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "../reducers/authorizationReducer";

export const store = configureStore({
  reducer: {
    authorization: authorizationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import authorizationSlice from "../reducers/authorizationReducer";
import registrationSlice from "../reducers/registrationReducer";
import articlesSlice from "../reducers/articlesReducer";
import contactsSlice from "../reducers/contactsReducer";
import checkboxSlice from "../reducers/checkboxReducer";
import catalogSlice from "../reducers/catalogReducer";
import headerSlice from "../reducers/headerReducer";
import selectSlice from "../reducers/selectReducer";
import mainSlice from "../reducers/mainReducer";
import newsSlice from "../reducers/newsReducer";

export const store = configureStore({
  reducer: {
    authorization: authorizationSlice,
    registration: registrationSlice,
    contacts: contactsSlice,
    articles: articlesSlice,
    checkbox: checkboxSlice,
    catalog: catalogSlice,
    select: selectSlice,
    header: headerSlice,
    main: mainSlice,
    news: newsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

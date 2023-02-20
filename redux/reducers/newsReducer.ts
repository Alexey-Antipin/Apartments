import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DateArticles } from "../../common/date";
import { Article } from "../../ts";
import axios from "axios";

type NewsAndArticles = { articleCurrent: Article; articles: Article[] };
type News = { articles: Article[] };

type NewsState = {
  articleCurrent: Article;
  articles: Article[];
  news: Article[];
};

const initialState: NewsState = {
  articleCurrent: {} as Article,
  articles: [],
  news: [],
};

export const newsThunk = createAsyncThunk(
  "news/newsList",
  async (id: number) => {
    let { data } = await axios.get<NewsState>(
      process.env.NEXT_PUBLIC_SITE_ARTICLES + id
    );

    // Массив статей, перевод формата времени
    let articles = data.articles;

    articles.forEach((_, index, array) => {
      let timeCurrent = DateArticles(array[index].time);

      array[index].time = timeCurrent as string;
    });

    // Выбранная статья, перевод формата времени
    let articleCurrent = data.articleCurrent;

    let date = DateArticles(articleCurrent.time);
    articleCurrent.time = date as string;

    return { articles, articleCurrent };
  }
);

export const countNewsThunk = createAsyncThunk(
  "news/amountNewsThunk",
  async () => {
    let { data } = await axios.get(process.env.NEXT_PUBLIC_SITE_NEWS);
    let articles = data.articles;

    return { articles };
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      newsThunk.fulfilled,
      (state, action: PayloadAction<NewsAndArticles>) => {
        state.articleCurrent = action.payload.articleCurrent;
        state.articles = action.payload.articles;
      }
    );
    builder.addCase(
      countNewsThunk.fulfilled,
      (state, action: PayloadAction<News>) => {
        state.news = action.payload.articles;
      }
    );
  },
});
export default newsSlice.reducer;

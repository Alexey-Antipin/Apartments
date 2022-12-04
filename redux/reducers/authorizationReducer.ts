import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationOfFormik } from "../../ts";
import axios from "axios";

export interface AuthorizationState {
  remember: boolean;
  error_user: string;
}

const initialState: AuthorizationState = {
  remember: false,
  error_user: "",
};

export const authorizationThunk = createAsyncThunk(
  "authorization/authorizationUser",
  async (
    { login, password, remember }: AuthorizationOfFormik,
    { rejectWithValue }
  ) => {
    try {
      await axios
        .get("http://localhost:3000/api/get-account/", {
          params: { login, password, remember },
        })
        .then((res) => {
          if (res.data.rememberUser == "true") {
            document.cookie = `user=${res.data[0]}; max-age=10800`;
          } else {
            document.cookie = `user=${res.data[0]};`;
          }
        });
    } catch (error: any) {
      let response: string = error.response.data;
      return rejectWithValue(response);
    }
  }
);

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    remember(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorizationThunk.fulfilled, (state) => {
      state.error_user = "";
      state.remember = false;
    });
    builder.addCase(
      authorizationThunk.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.error_user = action.payload as string;
      }
    );
  },
});

export const { remember } = authorizationSlice.actions;

export default authorizationSlice.reducer;

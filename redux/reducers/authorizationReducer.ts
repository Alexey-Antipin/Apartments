import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationOfFormik } from "../../ts";
import axios from "axios";

type AuthorizationState = {
  remember: boolean;
  error_user: string;
};

type GetData = { rememberUser: boolean; token: string };

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
      let { data } = await axios.get<GetData>(
        "http://localhost:3000/api/get-account/",
        {
          params: { login, password, remember },
        }
      );

      if (data.rememberUser) {
        document.cookie = `user=${data.token}; max-age=10800`;
      } else {
        document.cookie = `user=${data.token};`;
      }
    } catch (error: any) {
      let response: string = error.response.data;
      return rejectWithValue(response);
    }
  }
);

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authorizationThunk.fulfilled, (state) => {
      state.error_user = "";
      state.remember = true;
    });
    builder.addCase(
      authorizationThunk.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.error_user = action.payload as string;
      }
    );
  },
});

export default authorizationSlice.reducer;

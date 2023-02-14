import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationOfFormik } from "../../ts";
import axios from "axios";

type AuthorizationState = {
  account: boolean;
  error_user: string;
};

type GetData = { rememberUser: boolean; token: string };

const initialState: AuthorizationState = {
  account: false,
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
  reducers: {
    accountDelete(state) {
      state.account = false;
    },
    accountUser(state) {
      state.account = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorizationThunk.fulfilled, (state) => {
      state.error_user = "";
      state.account = true;
    });
    builder.addCase(
      authorizationThunk.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.error_user = action.payload as string;
      }
    );
  },
});

export const { accountUser, accountDelete } = authorizationSlice.actions;

export default authorizationSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type registrationField = {
  login: string;
  email: string;
  password: string;
};

type registrationState = { modal: boolean };

const initialState: registrationState = {
  modal: false,
};

export const redistrationThunk = createAsyncThunk(
  "redistration/redistrationUser",
  async ({ login, email, password }: registrationField) => {
    await axios.post<string>("http://localhost:3000/api/create-account/", {
      login,
      email,
      password,
    });
  }
);

export const redistrationSlice = createSlice({
  name: "redistration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(redistrationThunk.fulfilled, (state) => {
      state.modal = true;
    });
  },
});

export default redistrationSlice.reducer;

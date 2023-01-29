import { ContactsOfField } from "../../ts";
import {
  createAsyncThunk,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

type AuthorizationState = { messageOfSend: string; modal: boolean };

const initialState: AuthorizationState = {
  messageOfSend: "",
  modal: false,
};

export const contactsThunk = createAsyncThunk(
  "contacts/contactsField",
  async ({ name, email, message }: ContactsOfField) => {
    let { data } = await axios.post<string>(
      `http://localhost:3000/api/send/`,
      {
        name,
        email,
        message,
      }
    );
    return data;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    closeModal(state) {
      state.modal = false;
    },
    openModal(state) {
      state.modal = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      contactsThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.messageOfSend = action.payload;
      }
    );
  },
});

export const { closeModal, openModal } = contactsSlice.actions;

export default contactsSlice.reducer;

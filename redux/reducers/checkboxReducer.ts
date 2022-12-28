import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckboxState } from "../../ts";

type Action = {
  indexElement: number;
  status: boolean;
  index: number;
};

const initialState: CheckboxState = {
  checkboxMassive: [
    {
      list: [
        { id: 1, text: "Газовая плита", status: false },
        { id: 2, text: "Духовка", status: false },
        { id: 3, text: "Кофеварка", status: false },
        { id: 4, text: "Микроволновая печь", status: false },
        { id: 5, text: "Посуда", status: false },
        { id: 6, text: "Посудомоечная машина", status: false },
      ],
    },
    {
      list: [
        { id: 1, text: "Телевизор", status: false },
        { id: 2, text: "Чайник", status: false },
        { id: 3, text: "Холодильник", status: false },
        { id: 4, text: "Веник", status: false },
        { id: 5, text: "Еда", status: false },
        { id: 6, text: "Вода", status: false },
      ],
    },
  ],
};

export const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    checkbox(state, action: PayloadAction<Action>) {
      state.checkboxMassive[action.payload.index].list[
        action.payload.indexElement
      ].status = action.payload.status;
    },
  },
});

export const { checkbox } = checkboxSlice.actions;

export default checkboxSlice.reducer;

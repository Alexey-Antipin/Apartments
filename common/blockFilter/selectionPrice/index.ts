import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import {
  selectPriceMax,
  selectPriceMin,
} from "../../../redux/reducers/selectReducer";

// Выбор цен
export const selectionPrice = (
  min: string,
  max: string,
  dispatch: ThunkDispatch<{}, undefined, AnyAction>
) => {
  // Минимум цена
  if (min) {
    dispatch(selectPriceMin(min));
  } else {
    dispatch(selectPriceMin("0"));
  }

  // Максимум цена
  if (!max) {
    dispatch(selectPriceMax("10000"));
    return;
  }

  // Если минимум цены больше максимального
  if (min >= max) {
    dispatch(selectPriceMax(min));
  } else {
    dispatch(selectPriceMax(max));
  }
};

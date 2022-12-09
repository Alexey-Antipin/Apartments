import { createSlice } from "@reduxjs/toolkit";
import { MassiveOfSelect } from "../../ts";

type Object = {
  title: string;
  massive: string[];
};

type MainState = {
  array: string[];
  massive: MassiveOfSelect[];
  massiveList: Object[];
};

const initialState: MainState = {
  array: [
    "Квартиры на сутки",
    "Коттеджи и усадьбы",
    "Бани и сауны",
    "Авто напрокат",
  ],
  massive: [
    {
      id: 1,
      text: "Выберите",
      sprite: "mark",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Минске" },
        { id: 2, text: "Гомеле" },
        { id: 3, text: "Бресте" },
        { id: 4, text: "Витебске" },
        { id: 5, text: "Гродно" },
        { id: 6, text: "Могилеве" },
      ],
    },
    {
      id: 2,
      text: "Выберите",
      sprite: "mark",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Минске" },
        { id: 2, text: "Гомеле" },
        { id: 3, text: "Бресте" },
        { id: 4, text: "Витебске" },
        { id: 5, text: "Гродно" },
        { id: 6, text: "Могилеве" },
      ],
    },
  ],
  massiveList: [
    {
      title: "Квартиры",
      massive: [
        "Квартиры в Минске",
        "Квартиры в Гомеле",
        "Квартиры в Гродно",
        "Квартиры в Могилеве",
        "Квартиры в Бресте",
        "Квартиры в Витебск",
      ],
    },
    {
      title: "Коттеджи и усадьбы",
      massive: [
        "Аггроусадьбы",
        "Коттеджи",
        "Загородный комплекс",
        "Базы отдыха",
        "Еще",
      ],
    },
    {
      title: "Популярные направления",
      massive: [
        "Коттеджи и усадьбы на о. Брасласких",
        "Коттеджи и усадьбы (жилье) на Нарочи ",
        "Коттеджи и усадьбы (жилье) у воды,",
        "на берегу, на озере"
      ],
    },
  ],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
});

export default mainSlice.reducer;

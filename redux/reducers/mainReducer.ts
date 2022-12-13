import styles from "../../styles/Main.module.scss";
import { createSlice } from "@reduxjs/toolkit";
import { MassiveOfSelect } from "../../ts";

type Object = {
  title: string;
  massive: string[];
};

type ObjectSize = {
  index: number;
  width: number;
  title_2h: string;
  title_3h: string;
  cl_title_2h: string;
  cl_title_3h: string;
};

type MainState = {
  array: string[];
  cities: string[];
  pictureSize: ObjectSize[];
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
  cities: ["Минск", "Витебск", "Гродно", "Гомель", "Брест", "Могилев"],
  pictureSize: [
    {
      index: 1,
      width: 516,
      title_2h: "СНЯТЬ КВАРТИРУ",
      title_3h: "Квартиры на сутки",
      cl_title_2h: styles["title_2h-1"],
      cl_title_3h: styles["title_3h-1"],
    },
    {
      index: 2,
      width: 407,
      title_2h: "СНЯТЬ КОТТЕДЖ НА ПРАЗДНИК",
      title_3h: "Коттеджи и усадьбы",
      cl_title_2h: styles["title_2h-1"],
      cl_title_3h: styles["title_3h-2"],
    },
    {
      index: 3,
      width: 407,
      title_2h: "ПОПАРИТЬСЯ В БАНЕ С ДРУЗЬЯМИ",
      title_3h: "Бани и сауны",
      cl_title_2h: styles["title_2h-1"],
      cl_title_3h: styles["title_3h-2"],
    },
    {
      index: 4,
      width: 516,
      title_2h: "ЕСЛИ СРОЧНО НУЖНА МАШИНА",
      title_3h: "Авто на прокат",
      cl_title_2h: styles["title_2h-2"],
      cl_title_3h: styles["title_3h-3"],
    },
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
        "на берегу, на озере",
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

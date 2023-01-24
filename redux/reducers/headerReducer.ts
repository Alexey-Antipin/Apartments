import { MassiveOfList, MassiveOfSelect } from "../../ts";
import { createSlice } from "@reduxjs/toolkit";

type HeaderState = {
  link: MassiveOfList[];
  underList: MassiveOfSelect[];
};

const initialState: HeaderState = {
  link: [
    { id: 1, text: "Главная", href: "/" },
    { id: 2, text: "Новости", href: "/news" },
    { id: 3, text: "Размещение и тарифы", href: "/" },
    {
      id: 4,
      text: "Объявления на карте",
      href: "./",
      sprite: "sign",
    },
    { id: 5, text: "Контакты", href: "/contacts" },
    { id: 6, text: "Закладки", href: "/", sprite: "heart" },
  ],
  underList: [
    {
      id: 7,
      text: "Квартиры на сутки",
      element: "Город-Меню",
      sprite: "sign",
      list: [
        { id: 1, text: "Квартиры на сутки в Минске" },
        { id: 2, text: "Квартиры на сутки в Гомеле" },
        { id: 3, text: "Квартиры на сутки в Бресте" },
        { id: 4, text: "Квартиры на сутки в Витебске" },
        { id: 5, text: "Квартиры на сутки в Гродно" },
        { id: 6, text: "Квартиры на сутки в Могилеве" },
      ],
    },
    {
      id: 8,
      text: "Коттеджи и усадьбы",
      element: "Город-Меню",
      list: [
        { id: 1, text: "Коттеджи на сутки в Минске" },
        { id: 2, text: "Коттеджи на сутки в Гомеле" },
        { id: 3, text: "Коттеджи на сутки в Бресте" },
        { id: 4, text: "Коттеджи на сутки в Витебске" },
        { id: 5, text: "Коттеджи на сутки в Гродно" },
        { id: 6, text: "Коттеджи на сутки в Могилеве" },
      ],
    },
    {
      id: 9,
      text: "Бани и Сауны",
      element: "Город-Меню",
      list: [
        { id: 1, text: "Бани и Сауны в Минске" },
        { id: 2, text: "Бани и Сауны в Гомеле" },
        { id: 3, text: "Бани и Сауны в Бресте" },
        { id: 4, text: "Бани и Сауны в Витебске" },
        { id: 5, text: "Бани и Сауны в Гродно" },
        { id: 6, text: "Бани и Сауны в Могилеве" },
      ],
    },
    {
      id: 10,
      text: "Авто напрокат",
      element: "Город-Меню",
      list: [
        { id: 1, text: "Авто напрокат в Минске" },
        { id: 2, text: "Авто напрокат в Гомеле" },
        { id: 3, text: "Авто напрокат в Бресте" },
        { id: 4, text: "Авто напрокат в Витебске" },
        { id: 5, text: "Авто напрокат в Гродно" },
        { id: 6, text: "Авто напрокат в Могилеве" },
      ],
    },
  ],
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {},
});

export default headerSlice.reducer;

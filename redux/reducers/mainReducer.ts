import styles from "../../styles/Main.module.scss";
import { createSlice } from "@reduxjs/toolkit";
import { MassiveOfSelect } from "../../ts";

type Object = {
  title: string;
  massive: string[];
};

type ObjectCard = {
  sprite?: string;
  title: string;
  paragraph: string;
  paragraph_2?: string;
  button: string;
  cross?: string;
};

type ObjectSize = {
  cl_title_2h: string;
  cl_title_3h: string;
  title_2h: string;
  title_3h: string;
  index: number;
  width: number;
};

type MainState = {
  metroAndArea: MassiveOfSelect[];
  filterList: MassiveOfSelect[];
  massive: MassiveOfSelect[];
  pictureSize: ObjectSize[];
  massiveList: Object[];
  card: ObjectCard[];
  cities: string[];
  array: string[];
};

const initialState: MainState = {
  filterList: [
    {
      id: 1,
      title: "Спальные места",
      text: "Выберите",
      sprite: "mark",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Квартиры в Минске" },
        { id: 2, text: "Квартиры в Гомеле" },
        { id: 3, text: "Квартиры в Бресте" },
        { id: 4, text: "Квартиры в Витебске" },
        { id: 5, text: "Квартиры в Гродно" },
        { id: 6, text: "Квартиры в Могилеве" },
      ],
    },
    {
      id: 1,
      title: "Район",
      text: "Выберите",
      sprite: "mark",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Минский" },
        { id: 2, text: "Гомельский" },
        { id: 3, text: "Брестский" },
        { id: 4, text: "Витебский" },
        { id: 5, text: "Гродновский" },
        { id: 6, text: "Могилевский" },
      ],
    },
    {
      id: 1,
      title: "Метро",
      text: "Выберите",
      sprite: "mark",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Шабаны" },
        { id: 2, text: "Пушкинская" },
        { id: 3, text: "Фрунзенская" },
        { id: 4, text: "Октябрьская" },
        { id: 5, text: "Площадь Победы" },
        { id: 6, text: "Площадь Ленина" },
      ],
    },
  ],
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
      element: "Город",
      sprite: "mark",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Минск" },
        { id: 2, text: "Гомель" },
        { id: 3, text: "Брест" },
        { id: 4, text: "Витебск" },
        { id: 5, text: "Гродно" },
        { id: 6, text: "Могилев" },
      ],
    },
    {
      id: 2,
      text: "Выберите",
      element: "Комнаты",
      sprite: "mark",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Комнаты - 1" },
        { id: 2, text: "Комнаты - 2" },
        { id: 3, text: "Комнаты - 3" },
        { id: 4, text: "Комнаты - 4" },
        { id: 5, text: "Комнаты - 5" },
        { id: 6, text: "Комнаты - 6" },
      ],
    },
  ],
  massiveList: [
    {
      title: "Квартиры",
      massive: [
        "Квартиры в Минске",
        "Квартиры в Гомеле",
        "Квартиры в Бресте",
        "Квартиры в Витебске",
        "Квартиры в Гродно",
        "Квартиры в Могилеве",
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
  metroAndArea: [
    {
      id: 1,
      text: "Метро",
      sprite: "mark",
      sprite_2: "metro",
      spriteColour: "#664EF9",
      list: [
        { id: 1, text: "Шабаны" },
        { id: 2, text: "Пушкинская" },
        { id: 3, text: "Фрунзенская" },
        { id: 4, text: "Октябрьская" },
        { id: 5, text: "Площадь Победы" },
        { id: 6, text: "Площадь Ленина" },
      ],
    },
    {
      id: 2,
      text: "Район",
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
  card: [
    {
      sprite: "hand_people",
      title: "Начните привлекать клиентов бесплатно!",
      paragraph:
        "Пройдя простую регистрацию на сайте у Вас появится личный кабинет, в котором возможно <strong> бесплатно создавать и публиковать </strong> объявления на сайте. ",
      button: "+  Разместить объявление",
    },
    {
      sprite: "raise_ad",
      title: "Поднимайте объявления",
      paragraph:
        "Вы в любое время можете <strong> поднимать </strong> объявления <strong> вверх первой страницы </strong> каталога, они разместятся сразу после платных объявлений до тех пор, пока другой пользователь не повторит процедуру.",
      button: "Узнать стоимость услуги",
    },
    {
      title: "Приоритет Gold",
      paragraph:
        "Приоритетное размещение <strong> Gold </strong> позволяет <strong> закрепить ваше объявление </strong> в верхней <br/> части каталога!",
      paragraph_2:
        "Gold объявления <strong> перемещаются <br/> каждые 5 мин </strong> на 1 позицию, что делает размещение одинаковым для всех.",
      button: "Еще о тарифе Gold",
      cross: "/cross.png",
    },
  ],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
});

export default mainSlice.reducer;

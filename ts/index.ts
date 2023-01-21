import { FormikState } from "formik";

type ArticleRoom = {
  id: string;
  class: string;
  price: string;
  room_people: string;
  room: number;
  city: string;
  street: string;
  station: string;
  area: string;
  square: string;
  width: number;
  description: string;
  photo: string;
  places: string;
  photoMassive: PhotoMassive[];
  title?: string;
  time?: string;
  contacts: {
    master: string;
    telefon: string;
    email: string;
    link: {
      viber: string;
      whats_app: string;
      email: string;
    };
  };
  more: {
    gasCooker: boolean;
    oven: boolean;
    coffeeMaker: boolean;
    microwave: boolean;
    dishes: boolean;
    dishwasher: boolean;
    tv: boolean;
    teapot: boolean;
    refrigerator: boolean;
    broom: boolean;
    food: boolean;
    water: boolean;
  };
};

type PhotoMassive = {
  photo: string;
  width: number;
};

type SelectOfProps = {
  setActive: (value: number) => void;
  active: number;
  setZeroing?: (value: number) => void;
  zeroing?: number;

  cancelClosed?: (value: boolean) => void;
  massive: MassiveOfSelect;
  option_1v?: boolean;
  option_2v?: boolean;
  option_3v?: boolean;
};

type MassiveOfSelectList = {
  id: number;
  text: string;
};

type MassiveOfSelect = {
  list: MassiveOfSelectList[];
  spriteColour?: string;
  sprite_2?: string;
  element?: string;
  sprite?: string;
  title?: string;
  text: string;
  id: number;
};

type RegistrationOfFormik = {
  confirmPassword: string;
  password: string;
  login: string;
  email: string;
};

type AuthorizationOfFormik = {
  password: string;
  remember: boolean;
  login: string;
};

type ContactsOfField = {
  message: string;
  email: string;
  name: string;
};

type ResetForm = {
  resetForm: (
    values?: Partial<FormikState<ContactsOfField>> | undefined
  ) => void;
};

type Icon = {
  name: string;
  colour: string;
  width: string;
  height: string;
};

type PageProps = {
  articles: Article[];
  currentPage: number;
  totalData: number;
};

type PaginationProps = {
  itemsPerPage?: number;
  currentPage: number;
  totalItems: number;
  classes?: {
    wrapper: string;
  };
  link: string;
};

type PropsLimitOfPage = {
  limit: number;
  page: number;
  array: any[];
};

type ResponseError = {
  message: string;
};

type ArticleProps = {
  list: any[];
  alternative?: boolean;
  sliderTrue?: boolean;
  useSquare?: boolean;
  classes?: {
    classUl?: string;
    classList?: string;
  };
};

type LinkProps = {
  option_v1?: boolean;
  option_v2?: boolean;
  option_v3?: boolean;
  deepLink: string;
  main: string;
};

type Article = {
  id: string;
  title: string;
  time: string;
  photo: string;
  width: number;
  text: string[];
  description: string;
};

type LayoutProps = {
  children: JSX.Element;
};

type FooterOfArrayList = {
  a: string[];
  b: string[];
  c: string[];
  d: string[];
};

type Network = {
  name: string;
  href: string;
};

type MassiveOfListProps = {
  classes?: MassiveOfClassesProps;
  beginNumber?: number;
  active?: boolean;
  header?: { sprite?: boolean; title: string };
  amount?: string[];
  array: string[];
};

type MassiveOfClassesProps = {
  classDisabled?: string;
  classTitle?: string;
  classList?: string;
  classUl?: string;
};

type MassiveOfList = {
  id: number;
  text: string;
  sprite?: string;
  href: string;
};

type SpriteProps = {
  insideColour?: string;
  id: string | number;
  colour?: string;
  height?: string;
  width?: string;
};

type Object = { id: number; text: string; status: boolean };

type Massive = {
  list: Object[];
};

type CheckboxState = {
  checkboxMassive: Massive[];
  checkboxForComparison: [
    gasCooker: string,
    oven: string,
    coffeeMaker: string,
    microwave: string,
    dishes: string,
    dishwasher: string,
    tv: string,
    teapot: string,
    refrigerator: string,
    broom: string,
    food: string,
    water: string
  ];
  settings: boolean;
};

type MoreCheckbox = {
  [key: string]: boolean;
};

type CheckboxProps = {
  massive: Object[];
  numberling: any;
};

export type {
  CheckboxProps,
  CheckboxState,
  MoreCheckbox,
  ArticleRoom,
  ResetForm,
  Object,
  SelectOfProps,
  MassiveOfSelect,
  AuthorizationOfFormik,
  RegistrationOfFormik,
  ContactsOfField,
  Icon,
  PageProps,
  PaginationProps,
  PropsLimitOfPage,
  ResponseError,
  ArticleProps,
  LinkProps,
  Article,
  LayoutProps,
  FooterOfArrayList,
  Network,
  MassiveOfListProps,
  MassiveOfClassesProps,
  MassiveOfList,
  SpriteProps,
};

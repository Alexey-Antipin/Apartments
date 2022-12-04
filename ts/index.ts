import { FormikState } from "formik";

type SelectOfProps = {
  massive: MassiveOfSelect;
  active: number;
  setActive: (value: number) => void;
};

type MassiveOfSelectList = {
  id: number;
  text: string;
};

type MassiveOfSelect = {
  id: number;
  text: string;
  sprite?: string;
  list: MassiveOfSelectList[];
};

type RegistrationOfFormik = {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthorizationOfFormik = {
  login: string;
  password: string;
  remember: string;
};

type ContactsOfField = {
  name: string;
  email: string;
  message: string;
};

type ResetForm = {
  resetForm: (values?: Partial<FormikState<ContactsOfField>> | undefined) => void;
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
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
};

type PropsLimitOfPage = {
  limit: number;
  page: number;
};

type ResponseError = {
  message: string;
};

type ArticleProps = {
  list: Article[];
};

type LinkProps = {
  link: string;
  deeperLink?: string;
};

type Article = {
  id: string;
  title: string;
  time: string;
  photo: string;
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
  array: string[];
};

type MassiveOfClassesProps = {
  classUl?: string;
  classList?: string;
};

type MassiveOfList = {
  id: number;
  text: string;
  sprite?: string;
  href: string;
};

type SpriteProps = {
  id: string | number;
  colour?: string;
  height?: string;
  width?: string;
};

export type {
  ResetForm,
  SelectOfProps,
  MassiveOfSelect,
  RegistrationOfFormik,
  AuthorizationOfFormik,
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

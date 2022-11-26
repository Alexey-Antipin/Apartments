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
  href?: string;
};

type SpriteProps = {
  id: string | number;
  colour?: string;
  height?: string;
  width?: string;
};

export type {
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

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
};

type SpriteProps = {
  id: string | number;
  colour?: string;
  height?: string;
  width?: string;
};

export type {
  LayoutProps,
  FooterOfArrayList,
  Network,
  MassiveOfListProps,
  MassiveOfClassesProps,
  MassiveOfList,
  SpriteProps,
};

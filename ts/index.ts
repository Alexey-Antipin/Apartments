type MassiveOfListProps = {
  massive?: MassiveOfList[];
  classes?: MassiveOfClassesProps;
  hook?: {
    activeId: number;
    setActiveId: (value: number) => void;
  };
  usuallyList?: boolean;
  usuallyArray?: string[];
};

type MassiveOfClassesProps = {
  classSprite?: string;
  classUl?: string;
  classParagraph?: string;
  classColour?: string;
  classList?: string;
};

type MassiveOfList = {
  id: number;
  text: string;
  sprite?: string | number;
  colour?: string;
  underLine?: boolean;
  characterSprite?: {
    height?: string;
    width?: string;
    colour?: string;
  };
};

type SpriteProps = {
  id: string | number;
  colour?: string;
  height?: string;
  width?: string;
};

export type {
  MassiveOfListProps,
  MassiveOfClassesProps,
  MassiveOfList,
  SpriteProps,
};

import { createContext } from "react";

type ContextGlobal = {
  setHeart: (value: any) => void;
  heart: number;
  setColourSprite: (value: boolean) => void;
  colourSprite: boolean;
};

export const Context = createContext<ContextGlobal>({
  setColourSprite: () => {},
  colourSprite: false,
  setHeart: () => {},
  heart: 0,
});

import { createContext } from "react";

type ContextGlobal = {
  setHeart: (value: any) => void;
  heart: number;
};

export const Context = createContext<ContextGlobal>({
  heart: 0,
  setHeart: () => {},
});

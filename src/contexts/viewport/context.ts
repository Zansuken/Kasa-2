import { createContext } from "react";

type Viewport = {
  width: number;
  height: number;
};

export const viewportContext = createContext<Viewport>({
  width: 0,
  height: 0,
});

import { useContext, useMemo } from "react";
import { viewportContext } from "../contexts/viewport/context";

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);

  const isMobile = width < 768;

  return useMemo(
    () => ({ width, height, isMobile }),
    [height, isMobile, width]
  );
};

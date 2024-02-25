import { useContext, useMemo } from "react";
import { viewportContext } from "../contexts/viewport/context";

export const useViewport = () => {
  const { width, height } = useContext(viewportContext);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return useMemo(
    () => ({ width, height, isMobile, isTablet, isDesktop }),
    [height, isDesktop, isMobile, isTablet, width]
  );
};

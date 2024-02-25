import { FC } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";
import { devices } from "../../constants/viewport";

const Root = styled.div<StyledProps>(
  ({ theme: { palette, radius, spacing }, $currentDevice }) => {
    const isMobile = $currentDevice === devices.MOBILE;

    return {
      width: "fit-content",
      minWidth: isMobile ? 84 : 115,
      padding: `${spacing()} ${spacing(4)}`,
      background: palette.primary,
      color: "white",
      fontSize: isMobile ? 10 : 14,
      fontWeight: "bold",
      borderRadius: isMobile ? radius.sm : radius.md,
      textAlign: "center",
    };
  }
);

type Props = {
  label: string;
  isLoading?: boolean;
};

const Tag: FC<Props> = ({ label, isLoading }) => {
  const { currentDevice } = useViewport();

  if (isLoading) return null;

  return <Root $currentDevice={currentDevice}>{label}</Root>;
};

export default Tag;

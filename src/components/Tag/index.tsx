import { FC } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";

const Root = styled.div<StyledProps>(
  ({ theme: { palette, radius, spacing }, $isMobile }) => {
    return {
      width: "fit-content",
      minWidth: $isMobile ? 84 : 115,
      padding: `${spacing()}px ${spacing(4)}px`,
      background: palette.primary,
      color: "white",
      fontSize: $isMobile ? 10 : 14,
      fontWeight: "bold",
      borderRadius: $isMobile ? radius.sm : radius.md,
      textAlign: "center",
    };
  }
);

type Props = {
  label: string;
  isLoading?: boolean;
};

const Tag: FC<Props> = ({ label, isLoading }) => {
  const { isMobile } = useViewport();

  if (isLoading) return null;

  return <Root $isMobile={isMobile}>{label}</Root>;
};

export default Tag;

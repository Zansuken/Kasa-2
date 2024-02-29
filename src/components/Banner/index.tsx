import { FC } from "react";
import styled, { useTheme } from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";
import Skeleton from "../Skeleton";

export type MaxHeight = {
  mobile: number;
  desktop: number;
};

const ImageContainer = styled.div<StyledProps>(
  ({ $isMobile, theme: { radius } }) => ({
    position: "relative",
    width: "100%",
    height: "fit-content",
    boxShadow: $isMobile ? "none" : "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: $isMobile ? radius.md : radius.lg,
  })
);

const TextContainer = styled.div<StyledProps>(
  ({ $isMobile, theme: { radius, spacing } }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: $isMobile ? "flex-start" : "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    fontSize: $isMobile ? 24 : 48,
    fontWeight: "bold",
    zIndex: 1,
    borderRadius: $isMobile ? radius.md : radius.lg,
    boxSizing: "border-box",
    "& h1": {
      padding: $isMobile ? spacing(4) : spacing(8),
      maxWidth: $isMobile ? 225 : "unset",
    },
  })
);

const Image = styled.img<StyledProps & { $maxHeight?: MaxHeight }>(
  ({ theme: { radius }, $isMobile, $maxHeight }) => ({
    width: "100%",
    height: $maxHeight ? "100%" : $isMobile ? 255 : 415,
    maxHeight: $maxHeight
      ? $isMobile
        ? $maxHeight.mobile
        : $maxHeight.desktop
      : "100%",
    transform: $maxHeight ? "scaleY(1.02) translateY(1px)" : "unset",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: $isMobile ? radius.md : radius.lg,
  })
);

type Props = {
  src: string;
  isLoaded: boolean;
  maxHeight?: MaxHeight;
  text?: string;
};

const Banner: FC<Props> = ({ src, isLoaded, maxHeight, text }) => {
  const { isMobile } = useViewport();
  const theme = useTheme();

  const height = isMobile ? 255 : 415;
  const borderRadius = isMobile ? theme.radius.md : theme.radius.lg;

  if (!isLoaded) {
    return (
      <Skeleton
        variant="image"
        width={12}
        height={height}
        borderRadius={borderRadius}
        maxHeight={maxHeight}
      />
    );
  }

  if (text) {
    return (
      <ImageContainer $isMobile={isMobile}>
        <Image
          src={src}
          $isMobile={isMobile}
          $maxHeight={maxHeight}
          alt="banner"
        />
        <TextContainer $isMobile={isMobile}>
          <h1>{text}</h1>
        </TextContainer>
      </ImageContainer>
    );
  }

  return (
    <Image src={src} $isMobile={isMobile} $maxHeight={maxHeight} alt="banner" />
  );
};

export default Banner;

import { FC } from "react";
import styled, { useTheme } from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";
import Skeleton from "../Skeleton";

const Image = styled.img<StyledProps>(({ $sharedStyles }) => ({
  ...$sharedStyles,
}));

type Props = {
  src: string;
  isLoaded: boolean;
};

const Banner: FC<Props> = ({ src, isLoaded }) => {
  const { isMobile } = useViewport();
  const theme = useTheme();

  const height = isMobile ? 255 : 415;
  const borderRadius = isMobile ? theme.radius.md : theme.radius.lg;

  const sharedStyles = {
    width: "100%",
    height,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius,
  };

  if (isLoaded) {
    return (
      <Skeleton
        variant="image"
        width={12}
        height={height}
        borderRadius={borderRadius}
      />
    );
  }

  return <Image src={src} $sharedStyles={sharedStyles} alt="banner" />;
};

export default Banner;

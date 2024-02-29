import { FC } from "react";
import styled, { useTheme } from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";
import Skeleton from "../Skeleton";

const Image = styled.img<StyledProps>(({ theme: { spacing }, $isMobile }) => ({
  width: $isMobile ? spacing(8) : spacing(16),
  height: $isMobile ? spacing(8) : spacing(16),
  borderRadius: "50%",
}));

type Props = {
  src: string;
  isLoaded: boolean;
};

const Avatar: FC<Props> = ({ src, isLoaded = true }) => {
  const { isMobile } = useViewport();
  const { spacing } = useTheme();

  const lengths = isMobile ? spacing(8) : spacing(16);

  if (!isLoaded) {
    return <Skeleton variant="avatar" height={lengths} width={lengths} />;
  }
  return <Image src={src} $isMobile={isMobile} alt="avatar" />;
};

export default Avatar;

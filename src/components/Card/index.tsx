import { FC } from "react";
import styled from "styled-components";
import { useViewport } from "../../hooks/useViewport";
import { StyledProps } from "../../styles/theme";
import Skeleton from "../Skeleton";

const Root = styled.div<StyledProps>(
  ({ theme: { radius }, $isMobile, $isClickable }) => ({
    width: 340,
    height: $isMobile ? 255 : 340,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
      borderRadius: radius.md,
      zIndex: 1,
    },
    borderRadius: radius.md,
    cursor: $isClickable ? "pointer" : "default",
    "&:hover": $isClickable
      ? {
          cursor: "pointer",
          "& img": {
            transform: "scale(1.1)",
          },
        }
      : {},
  })
);

const Cover = styled.img<StyledProps>(({ theme: { radius } }) => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: radius.md,
  transition: "transform 0.3s ease-in-out",
}));

const TitleContainer = styled.div<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: spacing(2),
    padding: `${spacing(5)}px ${$isMobile ? spacing(4) : spacing(5)}px`,
    width: `calc(100% - 40px)`,
    zIndex: 2,
  })
);

const Title = styled.h2<StyledProps>({
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
  margin: 0,
  lineHeight: 1.4,
});

type Props = {
  src: string;
  isLoaded: boolean;
  title: string;
  isClickable?: boolean;
};

const Card: FC<Props> = ({ src, title, isLoaded, isClickable }) => {
  const { isMobile } = useViewport();

  if (!isLoaded) {
    return (
      <Root $isMobile={isMobile}>
        <TitleContainer $isMobile={isMobile}>
          <Skeleton variant="text" height={18} width={9} />
          <Skeleton variant="text" height={18} />
        </TitleContainer>
      </Root>
    );
  }
  return (
    <Root $isMobile={isMobile} $isClickable={isClickable}>
      <Cover $isMobile={isMobile} src={src} alt={title} />
      <TitleContainer $isMobile={isMobile}>
        <Title $isMobile={isMobile}>{title}</Title>
      </TitleContainer>
    </Root>
  );
};

export default Card;
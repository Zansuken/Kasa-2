import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";
import Skeleton from "../Skeleton";

const arrowDesktopIcon = "/arrow_carousel_desktop.png";
const arrowMobileIcon = "/arrow_carousel_mobile.png";

const Root = styled.div<StyledProps>(
  ({ theme: { spacing, radius }, $isMobile }) => ({
    display: "flex",
    flexDirection: "column",
    gap: spacing(3),
    position: "relative",
    width: "100%",
    borderRadius: $isMobile ? radius.md : radius.lg,
    overflow: "hidden",
  })
);

const Button = styled.button<StyledProps & { $arrowDirection: string }>(
  ({ theme: { spacing, radius }, $arrowDirection, $isMobile }) => ({
    position: "absolute",
    height: "101%",
    top: "50%",
    transform: "translateY(-50%)",
    padding: `0 ${spacing(6)}px`,
    border: "none",
    background: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    borderRadius:
      $arrowDirection === "left"
        ? $isMobile
          ? `${radius.md} 0 0 ${radius.md}`
          : `${radius.lg} 0 0 ${radius.lg}`
        : $isMobile
        ? `0 ${radius.md} ${radius.md} 0`
        : `0 ${radius.lg} ${radius.lg} 0`,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    "&:focus": {
      outline: "none",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    [$arrowDirection]: 0,
    "& img": {
      transform: $arrowDirection === "left" ? "rotate(180deg)" : "rotate(0deg)",
    },
  })
);

const Picture = styled.img<StyledProps>(({ $isMobile }) => ({
  width: "100%",
  height: $isMobile ? 255 : 415,
  objectFit: "cover",
  objectPosition: "center",
}));

const CurrentSlide = styled.p<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    position: "absolute",
    bottom: $isMobile ? spacing(4) : spacing(6) ?? 0,
    left: "50%",
    transform: "translateX(-50%)",
    margin: 0,
    padding: "5px 10px",
    color: "white",
    fontSize: $isMobile ? 14 : 18,
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.75)",
  })
);

type Props = {
  pictures: string[];
  isLoaded: boolean;
};

const Carousel: FC<Props> = ({ pictures, isLoaded }) => {
  const { isMobile } = useViewport();

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % pictures.length);
  }, [setCurrentSlide, pictures.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + pictures.length) % pictures.length);
  }, [setCurrentSlide, pictures.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      }
      if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const canChangePicture = pictures.length > 1;

  return (
    <Root $isMobile={isMobile}>
      {isLoaded ? (
        <>
          {canChangePicture && (
            <Button
              $isMobile={isMobile}
              $arrowDirection="left"
              onClick={prevSlide}
            >
              <img
                src={isMobile ? arrowMobileIcon : arrowDesktopIcon}
                alt="left"
              />
            </Button>
          )}
          <Picture
            $isMobile={isMobile}
            src={pictures[currentSlide]}
            alt="carousel"
            loading="lazy"
          />
          <CurrentSlide $isMobile={isMobile}>
            {currentSlide + 1} / {pictures.length}
          </CurrentSlide>
          {canChangePicture && (
            <Button
              $isMobile={isMobile}
              $arrowDirection="right"
              onClick={nextSlide}
            >
              <img
                src={isMobile ? arrowMobileIcon : arrowDesktopIcon}
                alt="right"
              />
            </Button>
          )}
        </>
      ) : (
        <Skeleton variant="image" height={isMobile ? 255 : 415} />
      )}
    </Root>
  );
};

export default Carousel;

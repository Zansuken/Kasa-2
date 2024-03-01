import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { FC } from "react";
import { useViewport } from "../../hooks/useViewport";

const emptyMobileStar = "/star_empty_mobile.png";
const emptyDesktopStar = "/star_empty_desktop.png";
const plainMobileStar = "/star_plain_mobile.png";
const plainDesktopStar = "/star_plain_desktop.png";

type Props = {
  value: number;
};

const Root = styled.div<StyledProps>(({ theme: { spacing }, $isMobile }) => ({
  display: "flex",
  width: "fit-content",
  gap: $isMobile ? spacing(1) / 2 : spacing(1),
  alignItems: "center",
  justifyContent: "center",
  padding: spacing(1),
}));

const StarContainer = styled.div<StyledProps>(({ $isMobile }) => ({
  width: $isMobile ? 18 : 36,
  height: $isMobile ? 18 : 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Rating: FC<Props> = ({ value = 0 }) => {
  const { isMobile } = useViewport();

  const stars = Array.from({ length: 5 }, (_, i) => {
    const isPlain = i < value;
    const emptyStar = isMobile ? emptyMobileStar : emptyDesktopStar;
    const plainStar = isMobile ? plainMobileStar : plainDesktopStar;
    const src = isPlain ? plainStar : emptyStar;

    return (
      <StarContainer $isMobile={isMobile} key={`star-${i}`}>
        <img src={src} alt="star" />
      </StarContainer>
    );
  });

  return <Root $isMobile={isMobile}>{stars}</Root>;
};

export default Rating;

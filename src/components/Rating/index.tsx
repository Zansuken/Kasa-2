import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { devices } from "../../constants/viewport";
import { FC } from "react";
import { useViewport } from "../../hooks/useViewport";

const emptyMobileStar = "/star_empty_mobile.png";
const emptyDesktopStar = "/star_empty_desktop.png";
const plainMobileStar = "/star_plain_mobile.png";
const plainDesktopStar = "/star_plain_desktop.png";

type Props = {
  value: number;
};

const Root = styled.div<StyledProps>(
  ({ theme: { spacing }, $currentDevice }) => ({
    display: "flex",
    width: "fit-content",
    gap: $currentDevice === devices.MOBILE ? spacing(1) / 2 : spacing(1),
    alignItems: "center",
    justifyContent: "center",
    padding: spacing(1),
  })
);

const StarContainer = styled.div<StyledProps>(({ $currentDevice }) => ({
  width: $currentDevice === devices.MOBILE ? 18 : 36,
  height: $currentDevice === devices.MOBILE ? 18 : 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Rating: FC<Props> = ({ value = 0 }) => {
  const { currentDevice } = useViewport();
  const isMobile = currentDevice === devices.MOBILE;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const isPlain = i < value;
    const emptyStar = isMobile ? emptyMobileStar : emptyDesktopStar;
    const plainStar = isMobile ? plainMobileStar : plainDesktopStar;
    const src = isPlain ? plainStar : emptyStar;

    return (
      <StarContainer $currentDevice={currentDevice}>
        <img src={src} alt="star" />
      </StarContainer>
    );
  });

  return <Root $currentDevice={currentDevice}>{stars}</Root>;
};

export default Rating;

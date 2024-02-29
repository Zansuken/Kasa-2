import { FC, PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useViewport } from "../../hooks/useViewport";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";

const arrowDesktopIcon = "/arrow_desktop.png";
const arrowMobileIcon = "/arrow_mobile.png";

const Root = styled.div<StyledProps & { $labelContainerHeightRef: number }>(
  ({
    theme: { palette, radius },
    $fullWidth,
    $isExpanded,
    $labelContainerHeightRef,
  }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: $fullWidth ? "100%" : "auto",
    height: "fit-content",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "calc(100% + 16px)",
      height: $labelContainerHeightRef,
      background: palette.grey.lighter,
      top: 0,
      left: -16,
      zIndex: -1,
      borderRadius: $isExpanded ? `${radius.sm} ${radius.sm} 0 0` : radius.sm,
    },
  })
);

const LabelContainer = styled.div<StyledProps>(
  ({ theme: { palette, spacing, radius }, $isMobile, $fullWidth }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: $isMobile ? spacing(2) : spacing(4),
    cursor: "pointer",
    backgroundColor: palette.primary,
    padding: $isMobile ? `${spacing(2)}px 0` : `${spacing(4)}px 0`,
    borderRadius: radius.sm,
    width: $fullWidth ? "100%" : "auto",
  })
);

const Label = styled.h2<StyledProps>(({ theme: { spacing }, $isMobile }) => ({
  fontSize: $isMobile ? 13 : 24,
  fontWeight: "bold",
  textAlign: "center",
  color: "white",
  marginLeft: $isMobile ? spacing(2) : spacing(4) ?? 0,
}));

const ArrowIcon = styled.img<StyledProps>(
  ({ theme: { spacing }, $isMobile, $isExpanded }) => ({
    transform: $isExpanded ? "rotate(0deg)" : "rotate(180deg)",
    transition: "transform 0.3s ease-in-out",
    marginRight: $isMobile ? spacing(2) : spacing(4) ?? 0,
  })
);

const Content = styled.div<StyledProps>(
  ({
    theme: { palette, spacing, radius },
    $isMobile,
    $fullWidth,
    $isExpanded,
  }) => ({
    backgroundColor: palette.grey.lighter,
    position: "absolute",
    opacity: $isExpanded ? 1 : 0,
    pointerEvents: "none",
    top: $isMobile ? spacing(7) : spacing(14),
    left: 0,
    padding: $isMobile ? spacing(4) : spacing(6),
    boxSizing: "border-box",
    borderRadius: `0 0 ${radius.sm} ${radius.sm}`,
    height: $isExpanded ? "fit-content" : 0,
    width: $fullWidth ? "100%" : "auto",
    fontSize: $isMobile ? 12 : 18,
    transform: $isExpanded ? "translateY(0)" : "translateY(-20%)",
    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
    zIndex: -1,
  })
);

type Props = {
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
};

const ExpandableBox: FC<PropsWithChildren & Props> = ({
  label,
  children,
  fullWidth = true,
}) => {
  const { isMobile } = useViewport();

  const [isExpanded, setIsExpanded] = useState(false);

  const labelContainerRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const arrowIcon = isMobile ? arrowMobileIcon : arrowDesktopIcon;

  const labelContainerHeight = labelContainerRef.current?.clientHeight;

  const sharedProps = {
    $isMobile: isMobile,
    $isExpanded: isExpanded,
    $fullWidth: fullWidth,
  };

  return (
    <Root $labelContainerHeightRef={labelContainerHeight ?? 0} {...sharedProps}>
      <LabelContainer
        {...sharedProps}
        onClick={toggleExpanded}
        ref={labelContainerRef}
      >
        <Label {...sharedProps}>{label}</Label>
        <ArrowIcon
          src={arrowIcon}
          $isMobile={isMobile}
          $isExpanded={isExpanded}
          alt={isExpanded ? "collapse" : "expand"}
        />
      </LabelContainer>
      <Content {...sharedProps}>{children}</Content>
    </Root>
  );
};

export default ExpandableBox;

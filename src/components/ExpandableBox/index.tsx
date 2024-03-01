import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { useViewport } from "../../hooks/useViewport";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";

const arrowDesktopIcon = "/arrow_desktop.png";
const arrowMobileIcon = "/arrow_mobile.png";

const Root = styled.div<StyledProps>(({ $fullWidth }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: $fullWidth ? "100%" : "auto",
  height: "fit-content",
  position: "relative",
}));

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
  ({ theme: { palette, spacing, radius }, $isMobile, $isExpanded }) => ({
    backgroundColor: palette.grey.lighter,
    paddingLeft: $isMobile ? spacing(4) : spacing(6),
    paddingRight: $isMobile ? spacing(4) : spacing(6),
    paddingTop: $isExpanded ? ($isMobile ? spacing(4) : spacing(6)) : 0,
    paddingBottom: $isExpanded ? ($isMobile ? spacing(4) : spacing(6)) : 0,
    borderRadius: `0 0 ${radius.sm} ${radius.sm}`,
    height: "100%",
    maxHeight: $isExpanded ? "100%" : 0,
    overflow: "hidden",
    boxSizing: "border-box",
    transition:
      "max-height 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-bottom 0.3s ease-in-out",
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

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const arrowIcon = isMobile ? arrowMobileIcon : arrowDesktopIcon;

  return (
    <Root $fullWidth={fullWidth}>
      <LabelContainer
        $isMobile={isMobile}
        $fullWidth={fullWidth}
        onClick={toggleExpanded}
      >
        <Label $isMobile={isMobile}>{label}</Label>
        <ArrowIcon
          src={arrowIcon}
          $isMobile={isMobile}
          $isExpanded={isExpanded}
          alt={isExpanded ? "collapse" : "expand"}
        />
      </LabelContainer>
      <Content $isMobile={isMobile} $isExpanded={isExpanded}>
        {children}
      </Content>
    </Root>
  );
};

export default ExpandableBox;

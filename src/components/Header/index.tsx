import { FC } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";
import Navigation from "./Navigation";

const mobileLogo = "/logo_mobile.png";
const desktopLogo = "/logo_desktop.png";

const Root = styled.header<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: $isMobile
      ? `${spacing(5)}px ${spacing(5)}px 0`
      : `${spacing(11)}px ${spacing(25)}px 0`,
  })
);

const Header: FC = () => {
  const { isMobile } = useViewport();

  const logo = isMobile ? mobileLogo : desktopLogo;

  return (
    <Root $isMobile={isMobile}>
      <img src={logo} alt="Logo de Kasa" />
      <Navigation />
    </Root>
  );
};

export default Header;

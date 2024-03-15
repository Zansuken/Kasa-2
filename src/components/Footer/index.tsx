import { FC } from "react";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import { useViewport } from "../../hooks/useViewport";

const logo = "/logo_footer.png";

const Root = styled.footer<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    backgroundColor: "black",
    width: "100%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: $isMobile ? spacing(4) : spacing(8),
    paddingTop: spacing(16),
    paddingBottom: $isMobile ? spacing(14) : spacing(7),
    "& p": {
      fontSize: $isMobile ? spacing(3) : spacing(6),
      maxWidth: $isMobile ? 130 : "unset",
      textAlign: "center",
    },
  })
);

const Footer: FC = () => {
  const { isMobile } = useViewport();

  return (
    <Root $isMobile={isMobile}>
      <img src={logo} alt="Logo de Kasa" />
      <h2>© 2020 Kasa. All rights reserved</h2>
    </Root>
  );
};

export default Footer;

import { FC, PropsWithChildren, memo } from "react";
import { useViewport } from "../../hooks/useViewport";
import styled from "styled-components";
import { StyledProps } from "../../styles/theme";
import Header from "../Header";
import Footer from "../Footer";

const Root = styled.div<StyledProps>(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
}));

const MainContainer = styled.div<StyledProps>({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const Main = styled.main<StyledProps>(({ theme: { spacing }, $isMobile }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: $isMobile
    ? `${spacing(5)}px ${spacing(5)}px 0`
    : `${spacing(11)}px ${spacing(25)}px 0`,
}));

const Layout: FC<PropsWithChildren> = memo(({ children }) => {
  const { isMobile } = useViewport();

  return (
    <Root>
      <MainContainer $isMobile={isMobile}>
        <Header />
        <Main>{children}</Main>
      </MainContainer>
      <Footer />
    </Root>
  );
});

export default Layout;

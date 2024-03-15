import { FC } from "react";
import Layout from "../components/Layout";
import { NavLink as BaseNavLink } from "react-router-dom";
import styled from "styled-components";
import { StyledProps } from "../styles/theme";
import { useViewport } from "../hooks/useViewport";
import { Routes } from "../router/routes";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Container = styled.div<StyledProps>({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  flexGrow: 1,
});

const Title = styled.h1<StyledProps>(({ theme: { palette }, $isMobile }) => ({
  textAlign: "center",
  color: palette.primary,
  fontSize: $isMobile ? 96 : 288,
  fontWeight: "bold",
  lineHeight: 0.75,
}));

const Paragraph = styled.p<StyledProps>(
  ({ theme: { palette }, $isMobile }) => ({
    textAlign: "center",
    color: palette.primary,
    fontSize: $isMobile ? 18 : 36,
    lineHeight: 1.4,
  })
);

const NavLink = styled(BaseNavLink)<StyledProps>(
  ({ theme: { palette }, $isMobile }) => ({
    fontSize: $isMobile ? 14 : 18,
    color: "inherit",
    textDecoration: "underline",
    "&:hover": {
      color: palette.primary,
    },
  })
);

const NotFound: FC = () => {
  useDocumentTitle("🤔 404");
  const { isMobile } = useViewport();

  return (
    <Layout>
      <Container>
        <Title $isMobile={isMobile}>404</Title>
        <Paragraph $isMobile={isMobile}>
          Oups! La page que vous demandez n'existe pas.
        </Paragraph>
        <NavLink to={Routes.HOME} $isMobile={isMobile}>
          Retourner sur la page d'accueil
        </NavLink>
      </Container>
    </Layout>
  );
};

export default NotFound;

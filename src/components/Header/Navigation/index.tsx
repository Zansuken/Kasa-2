import { FC } from "react";
import styled from "styled-components";
import { StyledProps } from "../../../styles/theme";
import { useViewport } from "../../../hooks/useViewport";
import { NavLink as BaseNavLink, NavLinkProps } from "react-router-dom";
import { Routes } from "../../../router/routes";

const Root = styled.nav<StyledProps>(({ theme: { spacing }, $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  gap: $isMobile ? spacing(6) : spacing(14),
}));

const NavLink: FC<NavLinkProps & StyledProps> = styled(BaseNavLink)(
  ({ theme: { palette, spacing }, $isMobile }) => ({
    textDecoration: "none",
    color: "inherit",
    fontSize: $isMobile ? spacing(3) : spacing(6),
    padding: spacing(1),
    "&:hover": {
      color: palette.primary,
    },
    "&.active": {
      textDecoration: "underline",
    },
  })
);

const Navigation: FC = () => {
  const { isMobile } = useViewport();

  return (
    <Root $isMobile={isMobile}>
      <NavLink to={Routes.HOME} $isMobile={isMobile}>
        ACCUEIL
      </NavLink>
      <NavLink to={Routes.ABOUT} $isMobile={isMobile}>
        À PROPOS
      </NavLink>
    </Root>
  );
};

export default Navigation;

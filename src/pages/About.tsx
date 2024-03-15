import { FC } from "react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import { useFetchData } from "../hooks/useFetchData";
import { requests } from "../api/requests";
import { AboutItem } from "../types";
import styled from "styled-components";
import { StyledProps } from "../styles/theme";
import ExpandableBox from "../components/ExpandableBox";
import { useViewport } from "../hooks/useViewport";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const aboutPageBanner = "/about_banner.png";

const AboutItemsContainer = styled.div<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    display: "flex",
    flexDirection: "column",
    gap: $isMobile ? spacing(5) : spacing(8),
    marginTop: $isMobile ? spacing(5) : spacing(9),
    marginBottom: $isMobile ? spacing(5) : spacing(9),
    width: "100%",
    padding: $isMobile ? "0" : `0 ${spacing(27)}px`,
    boxSizing: "border-box",
  })
);

const About: FC = () => {
  useDocumentTitle("À propos");
  const { isMobile } = useViewport();
  const { data, loading } = useFetchData<AboutItem[]>(requests.about);
  return (
    <Layout>
      <Banner
        src={aboutPageBanner}
        isLoaded
        maxHeight={{ mobile: 111, desktop: 223 }}
        addDarkFilter
      />
      <AboutItemsContainer $isMobile={isMobile}>
        {!loading &&
          data?.map((item) => (
            <ExpandableBox key={item.id} label={item.title}>
              {item.content}
            </ExpandableBox>
          ))}
      </AboutItemsContainer>
    </Layout>
  );
};

export default About;

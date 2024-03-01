import { FC } from "react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import { requests } from "../api/requests";
import { Housing } from "../types";
import Card from "../components/Card";
import styled from "styled-components";
import { StyledProps } from "../styles/theme";
import { useViewport } from "../hooks/useViewport";
import { useNavigate } from "react-router-dom";
import { Routes } from "../router/routes";
import { useFetchData } from "../hooks/useFetchData";

const bannerImg = "/home_banner.png";

const CardsContainer = styled.ul<StyledProps>(
  ({ theme: { spacing, palette, radius }, $isMobile }) => ({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: $isMobile ? "column" : "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: $isMobile ? "center" : "unset",
    gap: $isMobile ? spacing(5) : spacing(10),
    padding: $isMobile
      ? `0 0 ${spacing(6)}px 0`
      : `${spacing(14)}px ${spacing(13)}px`,
    marginTop: $isMobile ? spacing(6) : spacing(11),
    marginBottom: $isMobile ? spacing(6) : spacing(11),
    listStyle: "none",
    width: "100%",
    backgroundColor: $isMobile ? "transparent" : palette.grey.light,
    borderRadius: radius.lg,
  })
);

const Home: FC = () => {
  const { isMobile } = useViewport();
  const navigate = useNavigate();

  const { data: housing, loading: isHousingFetching } = useFetchData<Housing[]>(
    requests.getHousing
  );

  const cardsPlaceholder = Array.from({ length: 6 }, () => ({
    title: "",
    cover: "",
    id: "",
  }));

  const onCardClick = (id: string) =>
    navigate(Routes.HOUSING_DETAIL.replace(":id", id));

  return (
    <Layout>
      <Banner
        src={bannerImg}
        isLoaded
        maxHeight={{ mobile: 111, desktop: 223 }}
        text="Chez vous, partout et ailleurs"
      />
      <CardsContainer $isMobile={isMobile}>
        {isHousingFetching
          ? cardsPlaceholder.map((_, index) => (
              <Card
                key={index}
                src={_.cover}
                title={_.title}
                isLoaded={false}
              />
            ))
          : housing?.map((h) => (
              <Card
                key={h.id}
                title={h.title}
                src={h.cover}
                isLoaded={!isHousingFetching}
                isClickable
                onClick={() => onCardClick(h.id)}
              />
            ))}
      </CardsContainer>
    </Layout>
  );
};

export default Home;

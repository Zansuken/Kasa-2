import { FC } from "react";
import Layout from "../components/Layout";
import { useFetchData } from "../hooks/useFetchData";
import { requests } from "../api/requests";
import { useParams } from "react-router-dom";
import { HousingDetails as HousingDetailsType } from "../types";
import { useViewport } from "../hooks/useViewport";
import styled from "styled-components";
import { StyledProps } from "../styles/theme";
import Tag from "../components/Tag";
import Avatar from "../components/Avatar";
import Rating from "../components/Rating";
import ExpandableBox from "../components/ExpandableBox";
import Carousel from "../components/Carousel";

const TopSection = styled.div<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    width: "100%",
    display: "flex",
    gap: $isMobile ? spacing(4) : "unset",
    flexDirection: $isMobile ? "column" : "row",
    marginTop: $isMobile ? spacing(4) : spacing(8),
  })
);

const TopSectionLeft = styled.div<StyledProps>(
  ({ theme: { spacing, palette }, $isMobile }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& h1": {
      color: palette.primary,
      fontSize: $isMobile ? 18 : 36,
      lineHeight: 1.4,
    },
    "& p": {
      fontSize: $isMobile ? 14 : 18,
      lineHeight: 1.4,
      marginBottom: $isMobile ? spacing(3) : spacing(5),
    },
  })
);

const Tags = styled.ul<StyledProps>(({ theme: { spacing } }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing(3),
  padding: 0,
  margin: 0,
}));

const TopSectionRight = styled.div<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    display: "flex",
    flexDirection: $isMobile ? "row-reverse" : "column",
    alignItems: $isMobile ? "center" : "flex-end",
    justifyContent: $isMobile ? "space-between" : "unset",
    gap: spacing(7),
  })
);

const UserSection = styled.div<StyledProps>(({ theme: { spacing } }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: spacing(3),
}));

const UserNameContainer = styled.div<StyledProps>(
  ({ theme: { palette }, $isMobile }) => ({
    display: "flex",
    flexDirection: "column",
    "& p": {
      color: palette.primary,
      fontSize: $isMobile ? 14 : 18,
      lineHeight: 1.4,
      textAlign: "right",
    },
  })
);

const BottomSection = styled.div<StyledProps>(
  ({ theme: { spacing }, $isMobile }) => ({
    display: "flex",
    flexDirection: $isMobile ? "column" : "row",
    gap: spacing(4),
    marginTop: $isMobile ? spacing(4) : spacing(8),
    marginBottom: $isMobile ? spacing(6) : spacing(13),
  })
);

const EquipmentList = styled.ul<StyledProps>(({ theme: { spacing } }) => ({
  padding: 0,
  margin: 0,
  listStyle: "none",
  "& li": {
    marginBottom: spacing(3),
    width: "100%",
  },
  width: "100%",
}));

const HousingDetails: FC = () => {
  const { isMobile } = useViewport();
  const { id } = useParams<{ id: string }>();
  const { data: housing, loading } = useFetchData<HousingDetailsType>(
    requests.getHousingDetail,
    id
  );

  const hostNameArray = housing?.host.name.split(" ") ?? [];
  const hostFirstName = hostNameArray[0];
  const hostLastName = hostNameArray[1];

  return (
    <Layout>
      <Carousel pictures={housing?.pictures ?? []} isLoaded={!loading} />
      <TopSection $isMobile={isMobile}>
        <TopSectionLeft $isMobile={isMobile}>
          <h1>{housing?.title}</h1>
          <p>{housing?.location}</p>
          <Tags>
            {housing?.tags.map((tag, index) => (
              <Tag label={tag} isLoading={loading} key={`tag-${index}`} />
            ))}
          </Tags>
        </TopSectionLeft>
        <TopSectionRight $isMobile={isMobile}>
          <UserSection $isMobile={isMobile}>
            <UserNameContainer $isMobile={isMobile}>
              <p>{hostFirstName}</p>
              <p>{hostLastName}</p>
            </UserNameContainer>
            <Avatar src={housing?.host.picture ?? ""} isLoaded={!loading} />
          </UserSection>
          <Rating value={Number(housing?.rating) ?? 0} />
        </TopSectionRight>
      </TopSection>
      <BottomSection $isMobile={isMobile}>
        <ExpandableBox label="Description" fullWidth>
          {housing?.description}
        </ExpandableBox>
        <ExpandableBox label="Équipements" fullWidth>
          <EquipmentList>
            {housing?.equipments?.map((equipment, index) => (
              <li key={`equipment-${index}`}>{equipment}</li>
            ))}
          </EquipmentList>
        </ExpandableBox>
      </BottomSection>
    </Layout>
  );
};

export default HousingDetails;

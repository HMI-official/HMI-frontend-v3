import { Suspense } from "react";
import styled from "styled-components";
import { HMI_HERO } from "../../constants/image";
import { media } from "../../styles/Themes";
import Loading from "../Loading";

const teamConfig = {
  gap: "3rem",
};
interface ItemProps {
  name: string;
  planet: string;
  role: string;
  img: string;
  anime: string;
  delay: number;
  offset: number;
}

const teamData: ItemProps[] = [
  {
    name: "Sean",
    img: HMI_HERO.bigbang,
    planet: "Big Bang",
    role: "The Creator Of HI-Planet",
    anime: "flip-left",
    delay: 0,
    offset: 0,
  },
  {
    name: "Ryan",
    img: HMI_HERO.earth,
    planet: "HI",
    role: "Peacemaker",
    anime: "flip-left",
    delay: 150,
    offset: 0,
  },
  {
    name: "ABE",
    img: HMI_HERO.moon,
    planet: "MOOLU",
    role: "Tech-savvy",
    anime: "flip-left",
    delay: 300,
    offset: 0,
  },
  {
    name: "Push", // 여기가 push
    img: HMI_HERO.neptune,
    planet: "NEP",
    role: "Wisecracker",
    anime: "flip-left",
    delay: 450,
    offset: 0,
  },
  {
    name: "PARKER",
    img: HMI_HERO.mercury,
    planet: "MERC",
    role: "Motor-Mouth",
    anime: "flip-left",
    delay: 600,
    offset: 0,
  },
  {
    name: "JENNY",
    img: HMI_HERO.mars,
    planet: "MA",
    role: "Avant-Garde",
    anime: "flip-left",
    delay: 750,
    offset: 0,
  },
];

const Item = (props: ItemProps) => {
  return (
    <ItemContainer
      data-aos={props.anime}
      data-aos-delay={props.delay}
      data-aos-offset={props.offset}
    >
      <ImgContainer>
        <Suspense fallback={<Loading />}>
          <img src={props.img} alt="The HMI" loading="lazy" />
        </Suspense>
      </ImgContainer>
      <ItemTextContainer>
        <Name>{props.name}</Name>
        <Planet>{props.planet}</Planet>
        <Role>{props.role}</Role>
      </ItemTextContainer>
    </ItemContainer>
  );
};

const TeamV2 = () => {
  const TopItemComponent = teamData
    .slice(0, 3)
    .map((member) => <Item key={member.name} {...member} />);

  const BottomItemComponent = teamData
    .slice(3, 6)
    .map((member) => <Item key={member.name} {...member} />);
  return (
    <Section id="team">
      <Container>
        <MainTitle>Team</MainTitle>
        <Grid>
          {TopItemComponent}
          {BottomItemComponent}
        </Grid>
      </Container>
    </Section>
  );
};

export default TeamV2;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* flex: 1; */
`;
const ItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  gap: 0.2rem;
`;
const Name = styled.span`
  font-family: "Saira-Black";
  text-transform: uppercase;
  font-size: calc(${(props) => props.theme.fontlg} + 0.5rem);
  ${media.mobile} {
    font-size: ${(props) => props.theme.fontlg};
  }
`;
const Planet = styled.span``;
const Role = styled.span``;
const MainTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Saira-Black";
  color: ${(props) => props.theme.primary};
  font-size: ${(props) => props.theme.font2xl};
  text-transform: uppercase;
  ${media[768]} {
    font-size: ${(props) => props.theme.fontxl};
  }
`;
const Row = styled.div`
  display: flex;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  align-items: center;
  justify-content: center;
  gap: ${teamConfig.gap};
`;

const Section = styled.section`
  min-height: 30vh;
  /* padding: 14rem 0; */
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile} {
    padding-top: 10rem;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  width: 100%;
  max-width: 1130px;
  gap: calc(${teamConfig.gap});

  /* padding-left: 10rem; */
`;

const ImgContainer = styled.div`
  width: 20rem;
  height: 20rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  :hover {
    border-color: ${({ theme }) => theme.primary};
    /* border-color: #00ffeaa3; */
  }
  transition: all 0.3s ease-in-out;

  ${media.mobile} {
    width: 15rem;
    height: 15rem;
  }

  img {
    width: 16rem;
    height: 16rem;
    min-height: 16rem;

    object-fit: cover;

    @media (max-width: 48em) {
      width: 12rem;
      height: 12rem;
      min-height: 12rem;
    }
    @media (max-width: 30em) {
      width: 10rem;
      height: 10rem;
      min-height: 10rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: calc(${teamConfig.gap});
  width: 100%;
  align-items: center;
  justify-content: center;
  ${media["1200"]} {
    grid-template-columns: repeat(2, 300px);
  }
  ${media["768"]} {
    grid-template-columns: repeat(1, 300px);
  }
  /* max-width: 1130px; */
`;

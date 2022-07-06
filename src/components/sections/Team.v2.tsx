import styled from "styled-components";
import { HMI_HERO } from "../../constants/image";

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
    planet: "V",
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
        <img src={props.img} alt="The HMI" loading="lazy" />
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
        <Row>{TopItemComponent}</Row>
        <Row>{BottomItemComponent}</Row>
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
  text-transform: capitalize;
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
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  width: 100%;
  max-width: 1130px;
  gap: calc(${teamConfig.gap} * 2);

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

  img {
    width: 16rem;
    height: 16rem;
    min-height: 16rem;

    object-fit: cover;
  }

  @media (max-width: 48em) {
    width: 12rem;
  }
  @media (max-width: 30em) {
    width: 10rem;
  }

  /* img {
    width: 100%;
    height: auto;
  } */
`;

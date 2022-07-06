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
}

const teamData: ItemProps[] = [
  {
    name: "Sean",
    img: HMI_HERO.bigbang,
    planet: "Big Bang",
    role: "The Creator Of HI-Planet",
  },
  {
    name: "Ryan",
    img: HMI_HERO.earth,
    planet: "HI",
    role: "Peacemaker",
  },
  {
    name: "ABE",
    img: HMI_HERO.moon,
    planet: "MOOLU",
    role: "Tech-savvy",
  },
  {
    name: "Push", // 여기가 push
    img: HMI_HERO.neptune,
    planet: "V",
    role: "Wisecracker",
  },
  {
    name: "PARKER",
    img: HMI_HERO.mercury,
    planet: "MERC",
    role: "Motor-Mouth",
  },
  {
    name: "JENNY",
    img: HMI_HERO.mars,
    planet: "MA",
    role: "Avant-Garde",
  },
];

const Item = (props: ItemProps) => {
  return (
    <ItemContainer>
      <ImgContainer>
        <img src={props.img} alt="The HMI" />
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
`;
const ItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Name = styled.span``;
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
  padding: 14rem 0;
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
  width: 14rem;
  height: 14rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  /* cursor: pointer; */
  img {
    transition: all 0.3s ease-in-out;
    width: 14rem;

    object-fit: cover;
    border-radius: 20px;
    /* border-color: rgba(255, 255, 255, 0.5); */
    border: 2px solid rgba(255, 255, 255, 0.5);
    :hover {
      /* border-color: ${({ theme }) => theme.primary}; */
      border-color: #00ffeaa3;
    }
  }

  @media (max-width: 48em) {
    width: 12rem;
  }
  @media (max-width: 30em) {
    width: 10rem;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

import styled from "styled-components";
import { HMI_HEROS_BG_SHOWCASE_ARR } from "../constants/image";

const planets = [
  "earth",
  "moon",
  "mars",
  "jupiter",
  "saturn",
  "sun",
  "venus",
  "mercury",
  "neptune",
  "pluto",
  "saturn",
];

const ranks = ["silver", "gold", "diamond"];

const Collection = () => {
  const planetFilters = planets.map((planet, index) => {
    return (
      <FilterBtnContainer key={planet}>
        <div>{planet}</div>
        <div className="number">X{index + 1}</div>
      </FilterBtnContainer>
    );
  });

  const RankFilter = ranks.map((rank, index) => {
    return (
      <RankFilterContainer key={rank}>
        <div>{rank} </div>
        <div className="multiple">X</div>
        <div className="number"> {index + 1}</div>
      </RankFilterContainer>
    );
  });

  const Cards = HMI_HEROS_BG_SHOWCASE_ARR.map((item, index) => {
    return (
      <CardEl>
        <Image src={item} />
      </CardEl>
    );
  });
  return (
    <Section>
      <Wrapper>
        <PlanetFilterContainer>
          <div className="title">planets</div>
          <PlanetFilterContent>{planetFilters}</PlanetFilterContent>
        </PlanetFilterContainer>
        <RightContainer>
          <TopFilterContainer>
            <ButtonContainer>{RankFilter}</ButtonContainer>
          </TopFilterContainer>
          <CardContainer>{Cards}</CardContainer>
        </RightContainer>
      </Wrapper>
    </Section>
  );
};

export default Collection;

const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlanetFilterContainer = styled.div`
  display: flex;
  /* flex: 1; */
  flex-direction: column;
  /* height: 100vh; */
  height: 100%;
  text-transform: uppercase;
  font-weight: 800;
  padding: 8rem 0;
  .title {
    font-size: ${({ theme }) => theme.fontxl};
    padding: 0.5rem;
    margin: 0.2rem 0;
  }
  flex: 1;
`;
const RightContainer = styled.div`
  padding: 8rem 3rem;

  display: flex;
  flex-direction: column;
  min-height: 50vh;
  gap: 1rem;
  flex: 4;
`;
const TopFilterContainer = styled.div`
  display: flex;
  text-transform: uppercase;
  font-weight: 800;
  gap: 1rem;
`;
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.5rem;

  /* grid-auto-rows: minmax(15rem, auto); */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  gap: 3rem;
  /* flex-direction: column; */
`;

const PlanetFilterContent = styled.div`
  font-size: ${({ theme }) => theme.fontmd};
  > div {
    text-transform: capitalize;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    :hover {
      background-color: ${({ theme }) => theme.colors.gray600};
    }
  }
`;

const FilterBtnContainer = styled.div`
  display: flex;
  .number {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
`;
const RankFilterContainer = styled.div`
  transition: all 0.2s ease-in-out;
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.2rem;
  width: 10rem;
  cursor: pointer;
  .multiple {
    margin-left: 0.5rem;
  }
  .number {
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  /* gap: 0.2rem; */
  margin: 0.2rem 0;

  background: ${({ theme }) => theme.colors.gray600};
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.fontlg};
`;

const CardEl = styled.div``;
const Image = styled.img`
  /* max-width: 12rem; */
  width: 100%;
  object-fit: contain;
  border-radius: 0.7rem;
`;

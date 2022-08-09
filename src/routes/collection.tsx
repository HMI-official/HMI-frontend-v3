import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { HMI_HEROS_BG_SHOWCASE_ARR } from "../constants/image";
import { PLANET_NAMES, PLANET_RANKS } from "../constants/planet";
import { fakeDataRanks } from "../data/metadata";
import { media } from "../styles/Themes";

// const ranks = ["silver", "gold", "diamond"];

// console.log(fakeDataRanks);

const Collection = () => {
  const [currRanks, setCurrRanks] = useState<string[]>([]);
  const [currPlanets, setCurrPlanets] = useState<string[]>([]);

  const onClickRank = (rank: string) => {
    if (currRanks.includes(rank)) {
      setCurrRanks(currRanks.filter((r) => r !== rank));
    } else {
      setCurrRanks([...currRanks, rank]);
    }
  };

  const onClickPlanet = (planet: string) => {
    if (currPlanets.includes(planet)) {
      setCurrPlanets(currPlanets.filter((p) => p !== planet));
    } else {
      setCurrPlanets([...currPlanets, planet]);
    }
  };

  useEffect(() => {
    console.log(`currRanks: ${currRanks}`);
    console.log(`currPlanets: ${currPlanets}`);
  }, [currRanks, currPlanets]);

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  const planetFilters = PLANET_NAMES.map((planet, index) => {
    const isClicked = currPlanets.includes(planet);
    return (
      <FilterBtnContainer
        key={planet + index}
        onClick={() => onClickPlanet(planet)}
        isClicked={isClicked}
      >
        <div>{planet}</div>
        <div className="number">X{fakeDataRanks.planets[planet]}</div>
      </FilterBtnContainer>
    );
  });

  const RankFilter = PLANET_RANKS.map((rank, index) => {
    const isClicked = currRanks.includes(rank);
    return (
      <RankFilterContainer
        key={rank + index}
        onClick={() => onClickRank(rank)}
        isClicked={isClicked}
      >
        <div>{rank} </div>
        <div className="multiple">X</div>
        <div className="number"> {fakeDataRanks.ranks[rank]}</div>
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
    <Section id="collection">
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
  position: sticky;
  top: 0;
  display: flex;
  /* flex: 1; */
  flex-direction: column;
  /* height: 100vh; */
  height: 100%;
  text-transform: uppercase;
  font-weight: 800;
  padding: 8rem 0;
  width: 100%;
  .title {
    font-size: ${({ theme }) => theme.fontxl};
    padding: 0.5rem;
    margin: 0.2rem 0;
    padding-top: 0;
  }
  flex: 1;
  ${media.custom(1024)} {
    display: none;
  }
`;
const RightContainer = styled.div`
  padding: 8rem 3rem;
  width: 100%;

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
  ${media[1200]} {
    grid-template-columns: repeat(4, 1fr);
  }
  ${media.custom(1024)} {
    grid-template-columns: repeat(2, 1fr);
  }
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
  /* width: 100%; */
  > div {
    text-transform: capitalize;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
  }
`;

const FilterBtnContainer = styled.div<{ isClicked: boolean }>`
  display: flex;
  margin: 0.5rem 0;
  .number {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
  ${({ isClicked }) =>
    isClicked &&
    css`
      background-color: ${({ theme }) => theme.colors.gray600};
    `}

  :hover {
    background-color: ${({ theme }) => theme.colors.gray600};
  }
`;
const RankFilterContainer = styled.div<{ isClicked: boolean }>`
  transition: all 0.1s ease-in-out;
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.2rem;
  width: 10rem;
  cursor: pointer;
  .multiple {
    margin-left: 0.5rem;
  }
  ${({ isClicked }) =>
    isClicked &&
    css`
      background-color: ${({ theme }) => theme.colors.gray500};
    `}

  :hover {
    background-color: ${({ theme }) => theme.colors.gray500};
  }
  ${media.custom(1024)} {
    width: auto;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  /* gap: 0.2rem; */
  margin: 0.2rem 0;

  background: ${({ theme }) => theme.colors.gray600};
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.fontlg};
  ${media[768]} {
    font-size: ${({ theme }) => theme.fontmd};
  }
`;

const CardEl = styled.div``;
const Image = styled.img`
  /* max-width: 12rem; */
  width: 100%;
  object-fit: contain;
  border-radius: 0.7rem;
`;

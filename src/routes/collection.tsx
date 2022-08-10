import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Img from "react-optimized-image";
import { flash } from "../components/common/styles/keyframe";
import { HMI_HEROS_BG_SHOWCASE_ARR } from "../constants/image";
import { PLANET_NAMES, PLANET_RANKS } from "../constants/planet";
import { fakeDataRanks, fakeMetadata } from "../data/metadata";
import { IMetadata } from "../interfaces/metadata";
import { media } from "../styles/Themes";

// const ranks = ["silver", "gold", "diamond"];

// console.log(fakeDataRanks);

const Collection = () => {
  const [currRanks, setCurrRanks] = useState<string[]>([]);
  const [currPlanets, setCurrPlanets] = useState<string[]>([]);
  const [filterd, setFilterd] = useState<IMetadata[]>([]);

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
    const filterdRanks = fakeMetadata.filter((r) =>
      currRanks.includes(r.crown.toLowerCase())
    );
    const filterdPlanets = fakeMetadata.filter((p) =>
      currPlanets.includes(p.planet.toLowerCase())
    );

    const _flatten = [...new Set([...filterdRanks, ...filterdPlanets])];
    // consol

    // console.log(_flatten);
    setFilterd(_flatten);
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

  const filterdCards = filterd.map((item, index) => {
    const random = Math.floor(Math.random() * 10000);
    return (
      <CardEl key={item.image + random}>
        <Image src={item.image} />
      </CardEl>
    );
  });

  const isClickedFilter = currRanks.length > 0 || currPlanets.length > 0;
  return (
    <Section id="collection">
      <Wrapper>
        <IndicatorContainer>
          <Indicator isClicked={true}>Collections</Indicator>
          <Indicator isClicked={false}>Claim</Indicator>
        </IndicatorContainer>
        <Container>
          <PlanetFilterContainer>
            <div className="title">planets</div>
            <PlanetFilterContent>{planetFilters}</PlanetFilterContent>
          </PlanetFilterContainer>
          <RightContainer>
            <TopFilterContainer>
              <ButtonContainer>{RankFilter}</ButtonContainer>
            </TopFilterContainer>
            <CardContainer>
              {isClickedFilter ? filterdCards : Cards}
            </CardContainer>
          </RightContainer>
        </Container>
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

const IndicatorContainer = styled.div`
  margin: 0 0.5rem;
  gap: 0.5rem;
  display: flex;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray500};
  /* padding-bottom: 1rem; */
`;
const Indicator = styled.span<{ isClicked: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  padding: 0.5rem;
  cursor: pointer;
  position: relative;

  ::before {
    display: ${(props) => (props.isClicked ? "block" : "none")};
    content: "";
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    transform: translateY(50%);
    background-color: ${(props) => props.theme.primary};
  }
  /* border-bottom: 2px solid ${(props) => props.theme.primary}; */
  /* height: 100%; */
`;

const PlanetFilterContainer = styled.div`
  position: sticky;
  top: calc(${({ theme }) => theme.navHeight} + 1rem);
  display: flex;
  /* flex: 1; */
  flex-direction: column;
  /* height: 100vh; */
  height: 100%;
  text-transform: uppercase;
  font-weight: 800;
  /* padding: 8rem 0; */
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
  padding: 0 3rem;
  padding-right: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  min-height: 70vh;
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
  /* gap: 3rem; */
  padding: 8rem 0;

  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding-top: 3rem;
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

const CardEl = styled.div`
  animation: ${flash} 0.5s linear;
`;
const Image = styled.img`
  /* max-width: 12rem; */
  width: 100%;
  object-fit: contain;
  border-radius: 0.7rem;
`;

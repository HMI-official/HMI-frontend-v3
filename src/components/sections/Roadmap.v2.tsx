import React, { useEffect } from "react";
import styled from "styled-components";
import { ICarouselContent } from "../../interfaces";
import { media } from "../../styles/Themes";
import CarouselComponent from "../Roadmap/CarouselComponent";
// import Carousel from "../Roadmap/Carousel";
// import CarouselOrigin from "../Roadmap/CarouselOrigin";

const carouselConfig = {
  isCarouselTest: false,
  carouselGap: 80, //px
  carouselHeight: 340, //px
};
// 10rem = 160px
// 13 * 16 = 208px
// 7 * 16 = 112px
// 6rem = 96px
// 5rem = 80px

const carouselContents: ICarouselContent[] = [
  {
    title: "Q1",
    subtitle: "Launch HI-Planet NFT",
    content: [
      {
        number: "1-1",
        text: "Build HI-Planet Community",
      },
      {
        number: "1-2",
        text: "Carry our tier 1 marketing to grow Community",
      },
      {
        number: "1-3",
        text: "Launch 3,333 HI-Planet NFTs on ETH Blockchain",
      },
    ],
  },
  {
    title: "Q2",
    subtitle: "Welcome Package",
    content: [
      {
        number: "2-1",
        text: 'All HI-Planet holders will receive welcome packages physically which will be directly shipped by "High Minded Intelligence"',
      },
    ],
  },
  {
    title: "Q3",
    subtitle: "Community network",
    content: [
      {
        number: "3-1",
        text: "Merch collaboration event with holders",
      },
      {
        number: "3-2",
        text: "Acquisition of land in metaverse",
      },
      {
        number: "3-3",
        text: "Development of studio in metavers where members can hang out and interact together",
      },
    ],
  },
  {
    title: "Q4",
    subtitle: "Community network",
    content: [
      {
        number: "3-1",
        text: "Merch collaboration event with holders",
      },
      {
        number: "3-2",
        text: "Acquisition of land in metaverse",
      },
      {
        number: "3-3",
        text: "Development of studio in metavers where members can hang out and interact together",
      },
    ],
  },
  {
    title: "Q5",
    subtitle: "Community network",
    content: [
      {
        number: "3-1",
        text: "Merch collaboration event with holders",
      },
      {
        number: "3-2",
        text: "Acquisition of land in metaverse",
      },
      {
        number: "3-3",
        text: "Development of studio in metavers where members can hang out and interact together",
      },
    ],
  },
].reverse();

const RoadmapV2 = () => {
  const MobileCarouselComponent = <></>;
  return (
    <Section id="roadmap">
      <SectionWrapper>
        <TitleContainer>
          <Title>ROADMAP</Title>
        </TitleContainer>
        <CarouselEl>
          <Container>
            <CarouselComponent carouselContents={carouselContents} />
          </Container>
          <MobileContainer>{MobileCarouselComponent}</MobileContainer>
        </CarouselEl>
      </SectionWrapper>
      {/* <Galaxy /> */}
    </Section>
  );
};

export default RoadmapV2;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1130px;
  /* padding-left: 10rem; */
`;
const Section = styled.section`
  min-height: 50vh;
  width: 100vw;

  /* background-color: ${(props) => props.theme.body}; */
  position: relative;
  /* display: inline-block; */
  overflow: hidden;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
`;
const Title = styled.h1`
  font-size: calc(${(props) => props.theme.font2xl} + 1rem);
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-right: 10rem;
  font-family: "Saira-Black";
  width: fit-content;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
  ${media[768]} {
    padding-right: 0;
  }
  ${media.mobile} {
  }
`;

const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  padding-bottom: 1.5rem;
  ${media[768]} {
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
const Container = styled.div`
  cursor: grab;
  width: calc(100%) !important;
  min-height: 30vh;
  padding: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  @media (max-width: 64em) {
    width: 80%;
  }
  @media (max-width: 48em) {
    width: 90%;
  }
  ${media.mobile} {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;
  ${media.mobile} {
    display: flex;
  }
`;

const CarouselEl = styled.div`
  /* .container { */
  max-width: 100%;
  border-radius: 2rem;

  /* height: 100vh; */
  /* background: rgb(57, 49, 63); */
  background: ${carouselConfig.isCarouselTest ? "rgb(57, 49, 63)" : ""};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* padding: 0.4rem; */
  /* } */

  .container > h1 {
    color: rgb(255, 234, 195);
  }

  .carousel {
    /* width: 700px; */
    max-width: 100%;
    height: ${carouselConfig.carouselHeight}px;
    /* background: rgba(201, 165, 118, 0.37); */
    background: ${carouselConfig.isCarouselTest
      ? "rgba(201, 165, 118, 0.37)"
      : ""};

    direction: rtl;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
  }

  .carousel.active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  .cWrapper {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    align-items: flex-start;
    gap: ${carouselConfig.carouselGap}px;
  }

  .item {
    background: ${carouselConfig.isCarouselTest ? "coral" : ""};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item p {
    position: relative;
    top: -5px;
    font-size: 5rem;
    font-weight: bold;
    color: #fff;
    user-select: none;
  }

  .item:first-child {
    margin-right: 0px !important;
  }
  .item:last-child {
    margin-left: 0px !important;
  }
`;

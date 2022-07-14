import React, { ReactNode, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { ICarouselContent } from "../../interfaces";
import { media } from "../../styles/Themes";
import CarouselComponent from "../Roadmap/CarouselComponent";
import MobileCarouselComponent from "../Roadmap/MobileCarouselComponent";
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
    subtitle: "Metaverse Game launch ",
    content: [
      {
        number: "4-1",
        text: "The HI-planet story is a game oriented story. And with this will be the development of our P&E game in metaverse.",
      },
    ],
  },
].reverse();

const carouselContentsForward: ICarouselContent[] = [
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
    subtitle: "Metaverse Game launch ",
    content: [
      {
        number: "4-1",
        text: "The HI-planet story is a game oriented story. And with this will be the development of our P&E game in metaverse.",
      },
    ],
  },
];

const RoadmapV2 = () => {
  const carouselRef: HTMLElement | null = document.querySelector(".cWrapper");
  const onClickLeftArrow = () => {
    if (!carouselRef) return;
    const getTranslateX = carouselRef.style.transform;
    const getTranslateXValue = getTranslateX.split("(")[1];
    const getTranslateXValueNumber = Number(
      getTranslateXValue.split(")")[0].split("px")[0]
    );
    if (getTranslateXValueNumber >= 520) return;
    const translateX =
      getTranslateXValueNumber +
      carouselConfig.carouselGap +
      carouselConfig.carouselHeight;

    carouselRef.style.cssText = `
          transform: translateX(${translateX > 520 ? 520 : translateX}px);
          transition: transform 0.5s cubic-bezier(.25,.72,.51,.96);
        `;
  };

  const onClickRightArrow = () => {
    if (!carouselRef) return;
    const getTranslateX = carouselRef.style.transform;
    const getTranslateXValue = getTranslateX.split("(")[1];
    const getTranslateXValueNumber = Number(
      getTranslateXValue.split(")")[0].split("px")[0]
    );
    if (getTranslateXValueNumber <= 0) return;
    const translateX =
      getTranslateXValueNumber -
      carouselConfig.carouselGap -
      carouselConfig.carouselHeight;

    carouselRef.style.cssText = `
          transform: translateX(${translateX < 0 ? 0 : translateX}px);
          transition: transform 0.5s cubic-bezier(.25,.72,.51,.96);
        `;
  };
  return (
    <Section id="roadmap">
      <SectionWrapper>
        <TitleContainer>
          <Title>ROADMAP</Title>
        </TitleContainer>
        <CarouselEl>
          {/* labtop */}
          <LeftArrow onClick={onClickLeftArrow}>
            <IoIosArrowBack />
          </LeftArrow>
          <Container>
            <CarouselComponent carouselContents={carouselContents} />
          </Container>
          <RightArrow onClick={onClickRightArrow}>
            <IoIosArrowForward />
          </RightArrow>
        </CarouselEl>
        {/* mobile */}
        <MobileContainer>
          <MobileCarouselComponent carouselContents={carouselContentsForward} />
        </MobileContainer>
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
  ${media.mobile} {
    padding-bottom: 2rem;
  }
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
  width: 100%;
  align-items: center;
  justify-content: center;

  ${media.mobile} {
    display: flex;
  }
`;

const CarouselEl = styled.div`
  /* .container { */
  max-width: 100%;
  border-radius: 2rem;
  position: relative;

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

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
  font-size: 3rem;
  ${media[768]} {
    display: none;
    /* go */
  }
`;
const LeftArrow = styled(Arrow)`
  transform: translate(-150%, -50%);
  left: 0;
`;
const RightArrow = styled(Arrow)`
  transform: translate(150%, -50%);

  right: 0;
`;

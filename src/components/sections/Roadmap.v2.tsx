import React, { useEffect } from "react";
import styled from "styled-components";
// import Carousel from "../Roadmap/Carousel";
import CarouselOrigin from "../Roadmap/CarouselOrigin";

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

const carouselContents = [
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

const setting = {
  dragSpeed: 1.25,
  itemWidth: 330,
  itemHeight: 180,
  itemSideOffsets: 15,
};

const itemStyle = {
  width: `${setting.itemWidth}px`,
  height: `auto`,
  // height: `${setting.itemHeight}px`,
  margin: `0px ${setting.itemSideOffsets}px`,
};

const RoadmapV2 = () => {
  // const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const [carouselRef, setCarouselRef] = React.useState<HTMLDivElement | null>(
    null
  );

  const CarouselComponent = (
    <CarouselOrigin
      _data={carouselContents}
      carouselRef={carouselRef}
      carouselGap={carouselConfig.carouselGap}
      {...setting}
    >
      {carouselContents.map((content, _i) => (
        <RoadmapItemContainer
          key={_i}
          className="item carousel__item"
          ref={setCarouselRef}
          style={{ ...itemStyle }}
        >
          <RoadmapItemWrapper>
            <div className="item1">{content.title}</div>
            <div className="item2">{content.subtitle}</div>
            <CarouselWrapper>
              {content.content.map((item) => (
                <div>
                  <span>
                    {item.number}) {item.text}
                  </span>
                </div>
              ))}
            </CarouselWrapper>
          </RoadmapItemWrapper>
        </RoadmapItemContainer>
      ))}
    </CarouselOrigin>
  );
  return (
    <Section id="roadmap">
      <SectionWrapper>
        <TitleContainer>
          <Title>ROADMAP</Title>
        </TitleContainer>
        <CarouselEl>
          <Container>{CarouselComponent}</Container>
        </CarouselEl>
      </SectionWrapper>
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
  font-size: ${(props) => props.theme.font2xl};
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-right: 10rem;
  /* margin: 1rem auto; */
  /* font-weight: 800; */
  font-family: "Saira-Black";
  /* border-bottom: 2px solid ${(props) => props.theme.body}; */
  width: fit-content;
  /* border: 1px solid ${(props) => props.theme.primary}; */

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  width: 90%;
  padding-bottom: 6rem;
`;
const Container = styled.div`
  cursor: grab;
  width: calc(100% - 5rem) !important;
  min-height: 30vh;
  padding: 1rem 0;
  /* gap: 1rem; */
  /* background-color: ${(props) => props.theme.body}; */
  /* margin: 0 auto; */
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

const RoadmapItemWrapper = styled.div`
  padding: 1.5rem;
  gap: 0.6rem;
  display: flex;
  flex-direction: column;
`;

const RoadmapItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  /* gap: 1rem; */
  max-width: 27vw;
  direction: ltr !important;
  position: relative;
  min-height: ${carouselConfig.carouselHeight}px;
  /* width: 100% !important; */
  background: ${(props) => `rgb(${props.theme.bodyRgba},12%)`};
  border-radius: 1rem;

  .item1,
  .item2 {
    font-family: "Saira-Black";
    display: flex;
    /* justify-content: flex-end; */
    width: 100%;
  }
  .item1 {
    font-size: ${(props) => props.theme.font2xl};
  }
  .item2 {
    font-size: calc(${(props) => props.theme.fontlg} + 0.2rem);
    padding-bottom: 0.7rem;
  }
  :before {
    content: "";
    position: absolute;
    top: 0;
    right: -${carouselConfig.carouselGap / 2 + 15}px;
    height: 100%;
    width: 1px;
    background: ${(props) => props.theme.gray2};
    /* transform: ; */
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* max-width: 70%; */
  text-align: start;
  font-size: ${(props) => props.theme.fontlg};

  div {
    width: 100%;
    display: flex;
  }
  .number {
    word-break: keep-all !important;
    display: flex;
    min-width: 35px;
  }
`;

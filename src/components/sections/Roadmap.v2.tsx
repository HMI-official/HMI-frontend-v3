import React from "react";
import styled from "styled-components";
import Carousel from "../Roadmap/Carousel";

const items = ["one", "two", "three", "four", "five"].reverse();

const carouselContents = [
  {
    title: "Q1",
    subtitle: "Launch HI-Planet NFT",
    content: [
      "1-1 ) Build HI-Planet Community",
      "1-2) Carry our tier 1 marketing to grow Community",
      "1-3) Launch 3,333 HI-Planet NFTs on ETH Blockchain",
    ],
  },
  {
    title: "Q2",
    subtitle: "Welcome Package",
    content: [
      '2-1) All HI-Planet holders will receive welcome packages physically which will be directly shipped by "High Minded Intelligence"',
    ],
  },
  {
    title: "Q3",
    subtitle: "Community network",
    content: [
      "3-1) Merch collaboration event with holders",
      "3-2) Acquisition of land in metaverse",
      "3-3) Development of studio in metavers where members can hang out and interact together",
    ],
  },
];

const setting = {
  dragSpeed: 1.25,
  itemWidth: 480,
  itemHeight: 180,
  itemSideOffsets: 20,
};

const itemStyle = {
  width: `${setting.itemWidth}px`,
  height: `auto`,
  // height: `${setting.itemHeight}px`,
  margin: `0px ${setting.itemSideOffsets}px`,
};

interface CarouselProps {
  dragSpeed: number;
  itemWidth: number;
  itemHeight: number;
  itemSideOffsets: number;
  children: React.ReactNode;
  _data: string[];
}

const RoadmapV2 = () => {
  // const carouselRef = React.useRef<HTMLDivElement | null>(null);
  const [carouselRef, setCarouselRef] = React.useState<HTMLDivElement | null>(
    null
  );
  const CarouselComponent = (
    <Carousel _data={carouselContents} carouselRef={carouselRef} {...setting}>
      {carouselContents.map((content, _i) => (
        <RoadmapItemContainer
          key={_i}
          className="item carousel__item"
          ref={setCarouselRef}
          style={{ ...itemStyle }}
        >
          <div className="item1">{content.title}</div>
          <div className="item2">{content.subtitle}</div>
          <CarouselWrapper>
            <div>
              <div>1-1) Build HI-Planet Community</div>
            </div>
            <div>
              <span>1-2)</span> Carry our tier 1 marketing to grow Community
            </div>
            <div>
              <span>1-3)</span> Launch 3,333 HI-Planet NFTs on ETH Blockchain
            </div>
          </CarouselWrapper>
        </RoadmapItemContainer>
      ))}
    </Carousel>
  );
  return (
    <Section id="roadmap">
      <TitleContainer>
        <Title>ROADMAP</Title>
      </TitleContainer>
      <CarouselEl>
        <Container>{CarouselComponent}</Container>
      </CarouselEl>
    </Section>
  );
};

export default RoadmapV2;

const Section = styled.section`
  min-height: 50vh;
  width: 100vw;

  /* background-color: ${(props) => props.theme.body}; */
  position: relative;
  /* display: inline-block; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: ${(props) => props.theme.font3xl};
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* margin: 1rem auto; */
  /* font-weight: 800; */
  font-family: "Saira-Black";
  border-bottom: 2px solid ${(props) => props.theme.body};
  width: fit-content;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  width: 90%;
`;
const Container = styled.div`
  width: 100%;
  height: 80vh;
  /* gap: 1rem; */
  /* background-color: ${(props) => props.theme.body}; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
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
  .container {
    width: 100%;
    /* height: 100vh; */
    /* background: rgb(57, 49, 63); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container > h1 {
    color: rgb(255, 234, 195);
  }

  .carousel {
    /* width: 700px; */
    width: 100%;
    height: 300px;
    /* background: rgba(201, 165, 118, 0.37); */
    /* direction: rtl; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }

  .carousel.active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  .cWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .item {
    /* background: coral; */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
  }

  .item:first-child {
    margin-right: 0px !important;
  }
  .item:last-child {
    margin-left: 0px !important;
  }
`;

const RoadmapItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-width: 27vw;
  /* width: 100% !important; */
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
    font-size: ${(props) => props.theme.fontlg};
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: start;

  div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    /* align-items: flex-end; */
    /* text-align: left; */
    /* flex-direction: row-reverse; */
  }
  span {
    word-break: keep-all !important;
    display: flex;
    /* padding: 1rem; */
  }
`;

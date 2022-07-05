import React from "react";
import styled from "styled-components";
import Carousel from "../Roadmap/Carousel";

const items = ["one", "two", "three", "four", "five"];
const setting = {
  dragSpeed: 1.25,
  itemWidth: 300,
  itemHeight: 180,
  itemSideOffsets: 15,
};

const itemStyle = {
  width: `${setting.itemWidth}px`,
  height: `${setting.itemHeight}px`,
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
  const CarouselComponent = (
    <Carousel _data={items} {...setting}>
      {items.map((i, _i) => (
        <div key={_i} className="item" style={{ ...itemStyle }}>
          <p>{i}</p>
        </div>
      ))}
    </Carousel>
  );
  return (
    <Section id="roadmap">
      <Title>ROADMAP</Title>
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
  display: inline-block;
  overflow: hidden;
`;
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  /* font-weight: 800; */
  font-family: "Saira-Black";
  border-bottom: 2px solid ${(props) => props.theme.body};
  width: fit-content;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;
const Container = styled.div`
  width: 90%;
  height: 100vh;
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
    height: 100vh;
    background: rgb(57, 49, 63);
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
    background: rgba(201, 165, 118, 0.37);
    direction: rtl;
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
  }

  .item {
    background: coral;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
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

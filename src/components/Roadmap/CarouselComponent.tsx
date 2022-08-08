import React, { FC } from "react";
import styled from "styled-components";
import { ICarouselContent } from "../../interfaces";
import { media } from "../../styles/Themes";
import CarouselOrigin from "./CarouselOrigin";

const setting = {
  dragSpeed: 1.25,
  itemWidth: 330,
  itemHeight: 180,
  itemSideOffsets: 15,
};

const carouselConfig = {
  isCarouselTest: false,
  carouselGap: 80, //px
  carouselHeight: 340, //px
};
const itemStyle = {
  width: `${setting.itemWidth}px`,
  height: `auto`,
  // height: `${setting.itemHeight}px`,
  margin: `0px ${setting.itemSideOffsets}px`,
};

interface CarouselProps {
  carouselContents: ICarouselContent[];
}

const CarouselComponent: FC<CarouselProps> = ({ carouselContents }) => {
  const [carouselRef, setCarouselRef] = React.useState<HTMLDivElement | null>(
    null
  );

  return (
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
                    {item.number}
                    {item.number.length > 0 && ")"} {item.text}
                  </span>
                </div>
              ))}
            </CarouselWrapper>
          </RoadmapItemWrapper>
        </RoadmapItemContainer>
      ))}
    </CarouselOrigin>
  );
};

export default CarouselComponent;

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
  background: ${(props) => `rgb(${props.theme.bodyRgba},8%)`};
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
  ${media.mobile} {
    /* 330 */
    min-width: 330px;
  }
`;

const RoadmapItemWrapper = styled.div`
  padding: 1.5rem;
  gap: 0.6rem;
  display: flex;
  flex-direction: column;
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

import React, { FC, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { HMI_HEROS_BG_ARR } from "../../constants/image";

const slideCardConfig = {
  SLIDER_CARD_WIDTH: "20.625rem",
  SLIDER_CARD_NUMBER: 11,
  SLIDER_CARD_GAP: "3rem",
};

const NftItem = ({ img, passRef }: { img: string; passRef: any }) => {
  let play = () => (passRef.current.style.animationPlayState = "running");
  let pause = () => (passRef.current.style.animationPlayState = "paused");

  return (
    <ImgContainer onMouseOver={pause} onMouseOut={play}>
      <img src={img} alt="The HMI" />
    </ImgContainer>
  );
};
const ShowcaseV2 = () => {
  const Row1Ref = useRef<HTMLDivElement | null>(null);

  const TopRowNfts = HMI_HEROS_BG_ARR.map((img) => (
    <NftItem img={img} passRef={Row1Ref} />
  ));

  const _arr = Array.from({ length: 4 }, (_, i) => i);

  return (
    <Section>
      <Row direction="none" ref={Row1Ref}>
        {_arr.map((_, i) => TopRowNfts)}
      </Row>
    </Section>
  );
};

export default ShowcaseV2;

const Section = styled.section`
  min-height: 30vh;
  /* width: 100vw; */
  background-color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  & > *:first-child {
    animation-duration: 15s;

    @media (max-width: 30em) {
      animation-duration: 15s;
    }
  }
  & > *:last-child {
    animation-duration: 20s;
    @media (max-width: 30em) {
      animation-duration: 10s;
    }
  }
`;
const move = keyframes`
0%{ transform: translateX(100%)   };
100%{ transform: translateX(-100%)   }

`;

const slide = keyframes`
  0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(
      calc(
        -${slideCardConfig.SLIDER_CARD_WIDTH}* ${slideCardConfig.SLIDER_CARD_NUMBER} - ${slideCardConfig.SLIDER_CARD_GAP} * ${slideCardConfig.SLIDER_CARD_NUMBER}
      ),
      0px
    );
  }
`;

const Row = styled.div<{ direction: string }>`
  /* background-color: lightblue; */
  white-space: nowrap;
  box-sizing: content-box;
  margin: 2rem 0;
  display: flex;
  gap: ${slideCardConfig.SLIDER_CARD_GAP};

  animation: ${slide} linear infinite ${(props) => props.direction};
`;
const ImgContainer = styled.div`
  width: 20.625rem;
  // 330px = 15rem * 1.5
  /* margin: 0 1rem; */
  background-color: ${(props) => props.theme.body};
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
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
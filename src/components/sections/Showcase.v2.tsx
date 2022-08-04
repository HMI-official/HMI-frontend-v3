import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  HMI_DIAMOND_HEROS_BG_ARR,
  HMI_HEROS_BG_ARR,
  HMI_HEROS_BG_SHOWCASE_ARR,
} from "../../constants/image";
import { media } from "../../styles/Themes";

const slideCardConfig = {
  SLIDER_CARD_WIDTH: "20.625rem",
  SLIDER_CARD_NUMBER: 11 + 3,
  SLIDER_CARD_GAP: "2rem",
  TABLET_SLIDER_CARD_WIDTH: "15rem",
  TABLET_SLIDER_CARD_GAP: "1rem",
  MOBILE_SLIDER_CARD_WIDTH: "15rem",
};

// const showcaseArr = [...HMI_HEROS_BG_ARR, ...HMI_DIAMOND_HEROS_BG_ARR];
// showcaseArr[1] = showcaseArr[showcaseArr.length - 1];
// showcaseArr[4] = showcaseArr[showcaseArr.length - 2];
// showcaseArr[7] = showcaseArr[showcaseArr.length - 3];

const NftItem = ({ img, passRef }: { img: string; passRef: any }) => {
  const play = () => {};
  // const play = () => (passRef.current.style.animationPlayState = "running");
  const pause = () => {};
  // const pause = () => (passRef.current.style.animationPlayState = "paused");

  return (
    <ImgContainer onMouseOver={pause} onMouseOut={play}>
      <img src={img} alt="The HMI" />
    </ImgContainer>
  );
};
const ShowcaseV2 = () => {
  const Row1Ref = useRef<HTMLDivElement | null>(null);

  const TopRowNfts = HMI_HEROS_BG_SHOWCASE_ARR.map((img) => (
    <NftItem img={img} passRef={Row1Ref} />
  ));

  const _arr = Array.from({ length: 4 }, (_, i) => i);

  return (
    <Section id="showcase">
      <Row direction="none" ref={Row1Ref}>
        {_arr.map((_, i) => TopRowNfts)}
      </Row>
    </Section>
  );
};

export default ShowcaseV2;

const Section = styled.section`
  min-height: 30vh;
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  & > *:last-child {
    animation-duration: 40s;
    @media (max-width: 30em) {
      animation-duration: 30s;
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

const tabletSlide = keyframes`
 0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(
      calc(
        -${slideCardConfig.TABLET_SLIDER_CARD_WIDTH}* ${slideCardConfig.SLIDER_CARD_NUMBER} - ${slideCardConfig.SLIDER_CARD_GAP} * ${slideCardConfig.SLIDER_CARD_NUMBER}
      ),
      0px
    );
  }
`;

const mobileSlide = keyframes`
 0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(
      calc(
        -${slideCardConfig.MOBILE_SLIDER_CARD_WIDTH}* ${slideCardConfig.SLIDER_CARD_NUMBER} - ${slideCardConfig.SLIDER_CARD_GAP} * ${slideCardConfig.SLIDER_CARD_NUMBER}
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
  ${media[768]} {
    animation: ${tabletSlide} linear infinite ${(props) => props.direction};
  }
  ${media.mobile} {
    animation: ${mobileSlide} linear infinite ${(props) => props.direction};
    animation-duration: 70s !important;
  }
`;
const ImgContainer = styled.div`
  width: 20.625rem;
  // 330px = 15rem * 1.5
  /* margin: 0 1rem; */
  /* background-color: ${(props) => props.theme.body}; */
  display: flex;
  justify-content: center;
  align-items: center;

  /* cursor: pointer; */
  img {
    transition: all 0.3s ease-in-out;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
    /* border-color: rgba(255, 255, 255, 0.5); */
    border: 2px solid rgba(255, 255, 255, 0.5);
    :hover {
      border-color: ${({ theme }) => theme.primary};
      /* border-color: #00ffeaa3; */
    }
  }

  @media (max-width: 48em) {
    width: ${slideCardConfig.SLIDER_CARD_WIDTH};
  }
  @media (max-width: 30em) {
    width: ${slideCardConfig.MOBILE_SLIDER_CARD_WIDTH};
  }

  img {
    width: 100%;
    height: auto;
  }
`;

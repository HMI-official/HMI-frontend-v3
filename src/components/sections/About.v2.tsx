import React from "react";
import styled, { keyframes } from "styled-components";
import { ETC_IMAGES, SNS } from "../../constants/image";
import { ReactComponent as Moolu } from "../../assets/Nfts/moolu.svg";
import Galaxy from "../bgImg/Galaxy";
import { CgDollar } from "react-icons/cg";
import { ADDRESS } from "../../constants/address";
import { onClickWebsite } from "../../utils/common";
import { media } from "../../styles/Themes";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { motion } from "framer-motion";
// import {
//   subtitleVariants,
//   titleVariants,
// } from "../common/styles/framer-motion";

const localConfig = {
  isReversed: false,
};

const AboutV2 = () => {
  return (
    <Section id="about">
      <Container>
        <Box>
          <Title>REAL VALUE PROJECT</Title>
          {/* subtitleVariants */}
          <SubTextContainer>
            <SubText>
              HI-PLANET is an NFT project by High Minded Intelligence, IRL ("in
              real life") Streetwear fashion company. HI-Planet shares its 50%
              of net profit to Planet holders in the concept of NFT Utility
              (which comes from its E-commerce sales).
              <br />
              <br />
              HI-Planet was came from the concept of game. Our goal is moving on
              to metaverse and continue Planet story in the metaverse. Become a
              Planet holder and join us !
            </SubText>
          </SubTextContainer>
        </Box>
        <Box>
          <ImageContainer>
            <MachineContainer>
              <Machine src={ETC_IMAGES.machineDollar} />
              {/* <Machine src={ETC_IMAGES.machine} /> */}
              {/* <DollarContainer> */}
              {/* <CgDollar /> */}
              {/* <AiOutlineDollarCircle /> */}
              {/* </DollarContainer> */}
            </MachineContainer>
            <div className="item1">
              <Moolu />
            </div>
          </ImageContainer>
          <SNSContainer>
            <Icon onClick={() => onClickWebsite(ADDRESS.discord)}>
              <img src={SNS.discord} alt="discord" />
            </Icon>
            <Icon onClick={() => onClickWebsite(ADDRESS.twitter)}>
              <img src={SNS.twitter} alt="twitter" />
            </Icon>
          </SNSContainer>
        </Box>
      </Container>
      {/* <Galaxy /> */}
    </Section>
  );
};

export default AboutV2;

const upDown = keyframes`
    0% {
      transform: translateY(60px);
    }
    50% {
      transform: translateY(120px);
    }
    100% {
      transform: translateY(60px);
    }
`;

const rattle = keyframes`
   0% {
      transform: scaleX(-1) rotate(-7deg) translate(-3.5rem, -3.4rem);
      /* transform: scaleX(-1) rotate(-7deg) translate(-3.5rem, -3.4rem); */
    }
    50% {
      transform: scaleX(-1) rotate(-10deg) translate(-3.5rem, -3.4rem);
      /* transform: scaleX(-1) rotate(-10deg) translate(-3.5rem, -3.4rem); */
    }
    100% {
      transform: scaleX(-1) rotate(-7deg) translate(-3.5rem, -3.4rem);
    }
    `;

const rattleDollar = keyframes`
0% {
   transform: rotate(-4deg) translate(2.4rem, -1rem);
   /* transform: rotate(-7deg) translate(2.4rem, -1rem); */
 }
 50% {
   transform: rotate(-1deg) translate(2.4rem, -1rem);
   /* transform: rotate(-4deg) translate(2.4rem, -1rem); */
 }
 100% {
   transform: rotate(-4deg) translate(2.4rem, -1rem);
 }
 `;

const rattle2 = keyframes`
   0% {
      transform: scaleX(-1) rotate(-7deg) translate(-2.2rem, -2rem);
    }
    50% {
      transform: scaleX(-1) rotate(-10deg) translate(-2.2rem, -2rem);
    }
    100% {
      transform: scaleX(-1) rotate(-7deg) translate(-2.2rem, -2rem);
    }
`;

const rattleDollar2 = keyframes`
0% {
   transform: rotate(-4deg) translate(1.4rem, -0.2rem);
   /* transform: rotate(-7deg) translate(1.4rem, -0.2rem); */
 }
 50% {
   transform: rotate(-1deg) translate(1.4rem, -0.2rem);
   /* transform: rotate(-4deg) translate(1.4rem, -0.2rem); */
 }
 100% {
   transform: rotate(-4deg) translate(1.4rem, -0.2rem);
 }
`;

const rattle3 = keyframes`
   0% {
      transform: scaleX(-1) rotate(-7deg) translate(-0.7rem, -1.3rem);
    }
    50% {
      transform: scaleX(-1) rotate(-10deg) translate(-0.7rem, -1.3rem);
    }
    100% {
      transform: scaleX(-1) rotate(-7deg) translate(-0.7rem, -1.3rem);
    }
`;

const rattleDollar3 = keyframes`
0% {
   transform: rotate(-4deg) translate(0.2rem, -0.2rem);
   /* transform: rotate(-7deg) translate(0.2rem, -0.2rem); */
 }
 50% {
   transform: rotate(-1deg) translate(0.2rem, -0.2rem);
   /* transform: rotate(-4deg) translate(0.2rem, -0.2rem); */
 }
 100% {
   transform: rotate(-4deg) translate(0.2rem, -0.2rem);
 }
`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 40em) {
    /* min-height: 0; */
    min-height: 30vh;
  }
  ${media.mobile} {
    width: 80%;
  }
`;

const Title = styled(motion.h2)`
  font-size: ${(props) => props.theme.font2xl};
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  align-self: flex-start;
  width: 80%;
  /* margin: 0 auto; */
  font-family: "Saira-Black";

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
  @media (max-width: 30em) {
    /* font-size: ${(props) => props.theme.fontlg}; */
  }
  ${media.mobile} {
    padding-bottom: 2rem;
  }
`;

const SubTextContainer = styled.div`
  overflow: hidden;
`;
const SubText = styled(motion.p)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.body};
  align-self: flex-start;
  width: 80%;
  margin: 1rem 0;
  font-weight: 200;
  /* font-weight: 400; */
  @media (max-width: 64em) {
    width: 100%;
    /* text-align: center; */
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    /* font-size: ${(props) => props.theme.fontsm}; */
  }
  ${media.mobile} {
    line-height: 1.3;
  }
`;

const Image = styled.img`
  width: 20rem;
  border-radius: 1rem;
`;

const Section = styled.section`
  min-height: 50vh;
  /* padding: 5rem 0; */
  position: relative;
  padding-top: 0;
  width: 100%;

  /* background-color: ${(props) => props.theme.text}; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  ${media.mobile} {
    min-height: 0;
    min-height: 100vh;
  }
`;

const Container = styled.div`
  /* width: 80%; */
  width: 100%;
  max-width: 1130px;
  /* margin: 0 auto; */
  /* background-color: lightblue; */

  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 70em) {
    width: 85%;
  }

  @media (max-width: 64em) {
    width: 100%;
    flex-direction: column;

    & > *:last-child {
      width: 80%;
    }
  }
  @media (max-width: 40em) {
    & > *:last-child {
      width: 90%;
    }
  }
`;

const Icon = styled.div`
  display: flex;
  /* justify-content: flex-start; */
  justify-content: center;
  align-items: center;
  img {
    cursor: pointer;
    width: 50px;
    object-fit: contain;
    ${media.mobile} {
      width: 30px;
    }
  }
`;

const Machine = styled(Image)`
  transform: scaleX(-1) rotate(-10deg) translate(-3.5rem, -3.4rem);
  z-index: 1;
  /* transform:  */
  margin-right: -2rem;
  animation: ${rattleDollar} infinite linear 0.7s;
  object-fit: contain;
`;

const MachineContainer = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  display: flex;
  ${Machine} {
    ${media.custom(900)} {
      width: 15rem;
      animation: ${rattleDollar2} infinite linear 0.7s;
    }
    ${media.mobile} {
      width: 10rem;
      animation: ${rattleDollar3} infinite linear 0.7s;
    }
  }
  .item1 {
    z-index: 2;

    #arm {
      animation: ${upDown} 0.7s ease-in-out infinite;
    }
    image {
      object-fit: contain;
    }
    ${media.custom(900)} {
      svg {
        width: 15rem;
        height: 15rem;
      }
    }
    ${media.mobile} {
      svg {
        width: 10rem;
        height: 10rem;
      }
    }
  }
  ${media.mobile} {
    padding-top: 4rem;
  }
`;

const SNSContainer = styled.div`
  font-size: calc(${(props) => props.theme.fontlg} + 0.4rem);
  /* gap: 0.4rem; */
  padding-left: 4rem;
  gap: 1rem;
  display: flex;
  align-self: flex-start;
  color: ${(props) => props.theme.gray3};
  > svg {
    cursor: pointer;
  }
`;

const DollarContainer = styled.div`
  position: absolute;
  z-index: 2;
  left: 7rem;
  top: 50%;
  font-size: 2rem;
  animation: ${rattleDollar} infinite linear 0.7s;

  // dollar color
  /* color: #6b8068; */
  color: black;
  /* transform: scaleX(-1) rotate(-10deg) translate(-3.5rem, -3.4rem); */
  /* transform:  */

  /* margin-right: -6rem; */
  /* color: ${(props) => props.theme.text}; */
`;

import React from "react";
import { AiFillInstagram, AiFillTwitterSquare } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import { ETC_IMAGES, HMI_HERO } from "../../constants/image";
import { ReactComponent as Moolu } from "../../assets/Nfts/moolu.svg";
// import MooluSvg from "../../images/heros/Moolu-svg.svg";
import img1 from "../../assets/Nfts/bighead.svg";

const AboutV2 = () => {
  return (
    <Section id="about">
      <Container>
        <Box>
          <Title>REAL VALUE PROJECT</Title>
          <SubText>
            HI-PLANET is an NFT project by High Minded Intelligence, IRL ("in
            real life") Streetwear fashion company. HI-Planet shares its 50% of
            net profit to Planet holders in the concept of NFT Utility (which
            comes from its E-commerce sales).
            <br />
            <br />
            HI-Planet was came from the concept of game. Our goal is moving on
            to metaverse and continue Planet story in the metaverse. Become a
            Planet holder and join us !
          </SubText>
        </Box>
        <Box>
          <ImageContainer>
            <Machine src={ETC_IMAGES.machine} />
            {/* <Moon src={mooluSvg} /> */}
            <div className="item1">
              <Moolu />
            </div>
            {/* <Moon src={HMI_HERO.moon} /> */}
            {/* <MooluSvg /> */}
          </ImageContainer>
          <SNSContainer>
            <AiFillInstagram />
            <AiFillTwitterSquare />
            <FaDiscord />
          </SNSContainer>
        </Box>
      </Container>
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
    }
    50% {
      transform: scaleX(-1) rotate(-10deg) translate(-3.5rem, -3.4rem);
    }
    100% {
      transform: scaleX(-1) rotate(-7deg) translate(-3.5rem, -3.4rem);
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
    min-height: 50vh;
  }
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
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
    font-size: ${(props) => props.theme.fontlg};
  }
`;
const SubText = styled.p`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.body};
  align-self: flex-start;
  width: 80%;
  margin: 1rem 0;
  font-weight: 400;
  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const Image = styled.img`
  width: 20rem;
  border-radius: 1rem;
`;

const Section = styled.section`
  min-height: 50vh;
  /* padding: 5rem 0; */
  padding-top: 0;
  width: 100%;

  background-color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  ${Box}:nth-child(1) {
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

const ImageContainer = styled.div`
  display: flex;
  .item1 {
    z-index: 2;
    #arm {
      /* transform: translateY(-100px); */
      animation: ${upDown} 0.7s ease-in-out infinite;
    }
    image {
      object-fit: contain;
    }
  }
`;

const Moon = styled(Image)`
  z-index: 2;
  display: flex;
  width: 20rem;
  /* object-fit: contain; */
  /* transform: translateX(-1rem); */
`;

const Machine = styled(Image)`
  transform: scaleX(-1) rotate(-10deg) translate(-3.5rem, -3.4rem);
  z-index: 1;
  /* transform:  */
  margin-right: -2rem;
  animation: ${rattle} infinite linear 0.7s;
`;

const SNSContainer = styled.div`
  font-size: calc(${(props) => props.theme.fontlg} + 0.4rem);
  gap: 0.4rem;
  display: flex;
  align-self: flex-end;
  color: ${(props) => props.theme.gray3};
  > svg {
    cursor: pointer;
  }
`;

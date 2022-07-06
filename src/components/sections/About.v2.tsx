import React from "react";
import styled from "styled-components";

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
          <Image src="/images/heros-bg/earth.jpg" />
        </Box>
      </Container>
    </Section>
  );
};

export default AboutV2;

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
const SubTextLight = styled.p`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => `rgba(${props.theme.bodyRgba},0.6)`};
  align-self: flex-start;
  width: 80%;
  margin: 1rem auto;
  font-weight: 400;

  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fontsm};
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontsm};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontxs};
  }
`;
const ButtonContainer = styled.div`
  width: 80%;
  margin: 1rem auto;
  display: flex;
  align-self: flex-start;

  @media (max-width: 64em) {
    width: 100%;

    button {
      margin: 0 auto;
    }
  }
`;

const Image = styled.img`
  width: 20rem;
  border-radius: 1rem;
`;

const Section = styled.section`
  min-height: 50vh;
  padding: 5rem 0;
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

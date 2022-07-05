// import React from "react";
import styled from "styled-components";
import { Btn } from "../Button";
import { BsQuestionOctagon } from "react-icons/bs";
import { BiQuestionMark } from "react-icons/bi";
// import img1 from "../../assets/Nfts/bighead.svg";
import img2 from "../../assets/Nfts/bighead-1.svg";
// import img3 from "../../assets/Nfts/bighead-2.svg";
const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative;
  background-color: ${(props) => props.theme.body};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  .image--container {
    position: relative;
    align-items: center;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Title = styled.h1`
  font-weight: 800;
  font-family: "Montserrat";
  font-size: ${({ theme }) => theme.font2xl};
  line-height: ${({ theme }) => theme.fontlg};
  span {
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontxs};
  }
`;
const Button = styled(Btn)``;

const Indicator = styled.div`
  width: 28.75vw;
  height: 3vw;
  border: 0.125vw solid ${(props) => props.theme.text};
  box-sizing: border-box;
  border-radius: 6.875vw;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 0.875vw;
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${(props) => props.theme.text};
  margin: 2.5vw 0;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mintCardColor};

  border: 1px solid ${(props) => props.theme.text};
  padding: 1rem;

  border-radius: 20px;
  transform: rotate(-4deg);

  img {
    object-fit: contain;
    height: 100%;
    fill: #585858 !important;
  }
`;

const ButtonContainer = styled.div``;

const ItemWrapper = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  .item1 {
    z-index: 3;
    color: ${(props) => props.theme.body};
  }
  .item2 {
    z-index: 2;
    transform: translate(-4%, -4%) rotate(-4deg);
  }
  .item3 {
    z-index: 1;
    transform: translate(-8%, -8%) rotate(-4deg);
  }
`;

const QuestionMark = styled.div`
  position: absolute;
  z-index: 4;
  font-size: 6rem;
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.body};
  /* backdrop-filter: blur(4px); */
`;

const Minting = () => {
  return (
    <Section>
      <Container>
        <Box className="image--container">
          <ItemWrapper>
            <ImageContainer className="item1">
              <img src={img2} alt="hero" />
            </ImageContainer>
            <ImageContainer className="item2">
              <img src={img2} alt="hero" />
            </ImageContainer>
            <ImageContainer className="item3">
              <img src={img2} alt="hero" />
            </ImageContainer>
          </ItemWrapper>
          <QuestionMark>
            <BiQuestionMark />
          </QuestionMark>
        </Box>
        <Box>
          <Title>
            MINT YOUR
            <br /> Weirdo
            <br />
            <span>For</span> 0.2 ETH
          </Title>
          <Indicator>7777/7,777</Indicator>
          <ButtonContainer>
            <Button>mint</Button>
          </ButtonContainer>
        </Box>
      </Container>
    </Section>
  );
};

export default Minting;

import React from "react";
import styled from "styled-components";
import { ADDRESS } from "../../constants/address";
import { CLOTHES, SNS } from "../../constants/image";
import { media } from "../../styles/Themes";
import { onClickWebsite } from "../../utils/common";
import { Button } from "../common/styles/buttons";
// import CommonBtn from "../button/CommonBtn";
// import AutoHeightImage from "../common/AutoHeightImage";
// import { Section, Wrapper } from "../common/styles/page";

const text1 = `High Minded Intelligence is a street wear fashion brand that 
emphasizes the motivational lifestyle and satisfaction of its global 
community. Founded in downtown Los Angeles by Sean Beck. 
HMI was inspired by the cultural lifestyle of the California and 
New York artists, musicians and residents., thus delivering 
a rigid street fashion with a mix of classic design that can be 
worn on both casual and formal occasions.
`;

const text2 = `High Minded Intelligence carries with it, its community, sharing 
memories, stories and building relationships that`;

const Join = () => {
  return (
    <Section>
      <Container>
        <Title>Story of HMI</Title>
        <Wrapper>
          <Box className="item1">
            {/* <TextBox> */}
            {text1}
            <br />
            <br />
            <br />
            {text2}
            <ButtonContainer>
              <Button onClick={() => onClickWebsite(ADDRESS.hmi)}>
                Visit website
              </Button>
              <IconContainer>
                <Icon onClick={() => onClickWebsite(ADDRESS.tiktok)}>
                  <img src={SNS.tiktok} alt="tiktok" />
                </Icon>
                <Icon onClick={() => onClickWebsite(ADDRESS.instagram)}>
                  <img src={SNS.instagram} alt="instagram" />
                </Icon>
              </IconContainer>
            </ButtonContainer>
            {/* </TextBox> */}
          </Box>
          <Box className="item2" style={{ fontSize: "1.3rem" }}>
            <ImgWrapper
              onClick={() =>
                window.open(
                  "https://highmindedi.com/products/copy-of-hi-planet-classic-t-shirt-with-big-hi-planet-logo"
                )
              }
            >
              <img src={CLOTHES.black} alt="black sleeve" />
            </ImgWrapper>
            <ImgWrapper
              onClick={() =>
                window.open(
                  "https://highmindedi.com/products/copy-of-hi-planet-classic-t-shirt-1"
                )
              }
            >
              <img src={CLOTHES.white} alt="white_sleeve" />
            </ImgWrapper>
          </Box>
        </Wrapper>
      </Container>
    </Section>
  );
};

export default Join;

const Section = styled.section`
  min-height: 30vh;
  padding: 5rem 0;
  padding-bottom: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* max-width: 80%; */
  max-width: 1130px;
  ${media.mobile} {
    max-width: 80%;
  }
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.font2xl};
  font-weight: 800;
  flex: 1;
  font-family: "Saira-Black";
  /* height: 100%; */
  display: flex;
  height: 600px;
  color: ${({ theme }) => theme.primary};
  /* margin: 1rem auto; */
  max-width: 80%;
  /* text-align: start; */
  align-self: flex-start;

  ${media[768]} {
    font-size: ${({ theme }) => theme.fontxl};
    /* line-height: 1.2; */
  }
`;

const Box = styled.div`
  flex: 1;
  display: flex;
`;

const ImgWrapper = styled.div`
  /* min-width: 15rem; */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* div { */
  border-radius: 20px;

  /* } */

  img {
    width: 100%;
    min-width: 15rem;
    border-radius: 20px;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease-in-out;

    :hover {
      border-color: ${({ theme }) => theme.primary};
    }
  }
  ${media[768]} {
    width: 14rem;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  /* flex-direction: row; */
  /* max-width: 80%; */
  width: 100%;
  padding: 1rem 0;
  align-items: center;
  gap: 2rem;
  .item1 {
    flex-direction: column;
    height: 100%;
    gap: 2rem;
    font-size: calc(${(props) => props.theme.fontlg} + 0.1rem);
    ${media.mobile} {
      font-size: ${(props) => props.theme.fontmd};
      /* font-size: ${(props) => props.theme.fontsm}; */
      line-height: 1.5;
    }
  }
  .item2 {
    gap: 1rem;
  }
  ${media[1200]} {
    flex-direction: column;
  }

  ${media[768]} {
    flex-direction: column;
  }
  ${media.mobile} {
    .item2 {
      flex-direction: column;
    }
    .item1 {
      gap: 1rem;
      align-items: center;
      justify-content: center;
      /* text-align: center; */
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4rem;
  gap: 1rem;
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

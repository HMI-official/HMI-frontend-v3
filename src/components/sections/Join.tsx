import React from "react";
import styled from "styled-components";
import { CLOTHES } from "../../constants/image";
import { media } from "../../styles/Themes";
import { Button } from "../common/styles/buttons";
// import CommonBtn from "../button/CommonBtn";
// import AutoHeightImage from "../common/AutoHeightImage";
// import { Section, Wrapper } from "../common/styles/page";

const Join = () => {
  return (
    <Section>
      <Wrapper>
        <Box className="item1">
          <Title>
            Explore Our Brand
            <br />
            High Minded Intelligence
          </Title>
          <ButtonContainer>
            <Button onClick={() => window.open("https://highmindedi.com/")}>
              Visit Website
            </Button>
          </ButtonContainer>
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
    </Section>
  );
};

export default Join;

const Section = styled.section`
  min-height: 30vh;
  padding: 10rem 0;
  padding-bottom: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.font2xl};
  font-weight: 800;
  flex: 1;
  font-family: "Saira-Black";
  /* height: 100%; */
  display: flex;
  height: 600px;
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
  width: 15rem;
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
  max-width: 80%;
  width: 100%;
  padding: 1rem 0;
  align-items: center;
  gap: 2rem;
  .item1 {
    flex-direction: column;
    height: 100%;
    gap: 2rem;
  }
  .item2 {
    gap: 3rem;
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
      text-align: center;
    }
  }
`;

const ButtonContainer = styled.div``;

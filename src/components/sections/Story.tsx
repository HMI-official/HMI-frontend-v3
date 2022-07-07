import React from "react";
import styled from "styled-components";

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
const Story = () => {
  return (
    <Section id="story">
      <Container>
        <Title>Story of HMI</Title>
        <BoxContainer>
          <Box>
            <ImgContainer>
              <img src="/images/man-in-t-shirt.png" alt="man-in-shirt" />
            </ImgContainer>
            <Typo></Typo>
          </Box>
          <Box>
            {text1}
            <br />
            <br />
            <br />
            {text2}
            <ButtonContainer>
              <Button>Visit website</Button>
            </ButtonContainer>
          </Box>
        </BoxContainer>
      </Container>
    </Section>
  );
};

export default Story;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  color: ${(props) => props.theme.primary};
  font-family: "Saira-Black";

  /* margin: 1rem auto; */
  /* border-bottom: 2px solid ${(props) => props.theme.carouselColor}; */
  width: fit-content;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 5rem;
  > div:nth-child(2) {
    flex: 1;
    max-width: 70%;
  }
`;
const Box = styled.div`
  font-size: calc(${(props) => props.theme.fontlg} + 0.1rem);
`;
const Typo = styled.div``;

const Section = styled.section`
  min-height: 30vh;
  padding: 14rem 0;
  padding-bottom: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  /* align-items: flex-start; */
  width: 100%;
  max-width: 1130px;

  /* padding-left: 10rem; */
`;

const ImgContainer = styled.div`
  width: 20rem;
  /* height: 20rem; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  :hover {
    border-color: ${({ theme }) => theme.primary};
    /* border-color: #00ffeaa3; */
  }
  transition: all 0.3s ease-in-out;

  img {
    width: 20rem;
    border-radius: 20px;

    object-fit: contain;
  }

  @media (max-width: 48em) {
    width: 12rem;
  }
  @media (max-width: 30em) {
    width: 10rem;
  }
`;

const Button = styled.button`
  background: rgba(${({ theme }) => theme.bodyRgba}, 0.2);
  /* border: none; */
  color: #fff;
  font-weight: 900;
  /* font-family: "Saira-Black"; */
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  :hover {
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  padding-top: 2rem;
`;

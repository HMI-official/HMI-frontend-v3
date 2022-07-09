import React, { FC } from "react";
import styled from "styled-components";
import { ICarouselContent } from "../../interfaces";

interface CarouselProps {
  carouselContents: ICarouselContent[];
}

const MobileCarouselComponent: FC<CarouselProps> = ({ carouselContents }) => {
  return (
    <Container>
      <Wrapper>
        {carouselContents.map((content, _i) => (
          <Item>
            <Title>{content.title}</Title>
            <SubTitle>{content.subtitle}</SubTitle>
            <Text>
              {content.content.map((item) => (
                <div>
                  <span>
                    {item.number}) {item.text}
                  </span>
                </div>
              ))}
            </Text>
          </Item>
        ))}
      </Wrapper>
    </Container>
  );
};

export default MobileCarouselComponent;

const Container = styled.div`
  width: 90%;
  /* background: lightgray; */
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  gap: 2rem;
`;
const Item = styled.div`
  width: 15rem;
  height: 15rem;
  min-width: 15rem;
  /* background: gray; */
  display: flex;
  flex-direction: column;
  /* background: lightskyblue; */
  background: ${(props) => `rgb(${props.theme.bodyRgba},8%)`};
  border-radius: 1rem;
  padding: 1rem;
`;

const Title = styled.span`
  font-family: "Saira-Black";
  font-size: ${(props) => props.theme.fontxl};
`;
const SubTitle = styled.span`
  font-family: "Saira-Black";
  padding: 0.4rem 0;
  padding-bottom: 0.8rem;
  font-size: ${(props) => props.theme.fontlg};
`;
const Text = styled.span`
  line-height: 1.4;
`;

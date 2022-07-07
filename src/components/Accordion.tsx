import React, { FC, ReactNode, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Minus } from "../Icons/Minus";
import { Plus } from "../Icons/Plus";

const Title = styled.div`
  font-size: ${(props) => props.theme.fontsm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;
const Reveal = styled.div<{ clicked: boolean; h?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
  color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.6)`};
  font-size: ${(props) => props.theme.fontsm};
  font-weight: 300;
  line-height: 1.1rem;
  transition: all 0.3s ease-in-out;
  height: ${({ clicked, h }) => (clicked ? `${h ?? 0}px` : `auto`)};
  ${({ clicked, h }) =>
    clicked
      ? css`
          height: ${h}px;
        `
      : css`
          height: 0px;
        `};

  overflow: hidden;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
`;
const Indicator = styled.span`
  font-size: ${(props) => props.theme.fontxxl};
  transition: all 0.3s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 1rem;
    height: auto;
    fill: ${(props) => props.theme.carouselColor};
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  cursor: pointer;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.carouselColor};
  margin: 3rem 0;
  transition: all 0.3s ease-in-out;
  :hover {
    border-bottom-color: ${(props) => props.theme.primary};
    ${Indicator} {
      svg {
        fill: ${(props) => props.theme.primary};
      }
    }
    ${Title} {
      color: ${(props) => props.theme.primary};
    }
  }

  @media (max-width: 48em) {
    margin: 2rem 0;
  }
`;

const RevealWrapper = styled.div``;
interface AccordionProps {
  title: string;
  children: ReactNode;
  ScrollTrigger: any;
}

const Accordion: FC<AccordionProps> = ({ title, children, ScrollTrigger }) => {
  const [collapse, setCollapse] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  console.log(ref?.offsetHeight);

  useEffect(() => {
    ScrollTrigger.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse]);

  return (
    <Container onClick={() => setCollapse(!collapse)}>
      <Title>
        <Name>
          <span>{title}</span>
        </Name>
        {collapse ? (
          <Indicator>
            <Minus />
          </Indicator>
        ) : (
          <Indicator>
            <Plus />
          </Indicator>
        )}
      </Title>
      <Reveal clicked={collapse} h={ref?.offsetHeight}>
        <RevealWrapper ref={setRef}>{children}</RevealWrapper>
      </Reveal>
    </Container>
  );
};

export default Accordion;

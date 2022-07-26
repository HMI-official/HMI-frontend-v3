import React, { FC, ReactNode, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Minus } from "../Icons/Minus";
import { Plus } from "../Icons/Plus";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;
const Reveal = styled.div<{ clicked: boolean }>`
  display: ${(props) => (props.clicked ? "inline-block" : "none")};
  margin-top: 1rem;
  color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.6)`};
  font-weight: 300;
  /* line-height: 1.1rem; */
  line-height: 1.8;
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

const Container = styled.div<{ clicked: boolean }>`
  cursor: pointer;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.carouselColor};
  margin: 3rem 0;
  transition: all 0.3s ease-in-out;
  ${({ clicked }) =>
    clicked &&
    css`
      border-bottom-color: ${(props) => props.theme.primary};
      ${Indicator} {
        svg {
          fill: ${(props) => props.theme.primary};
        }
      }
      ${Title} {
        color: ${(props) => props.theme.primary};
      }
    `}
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
interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {}, [collapse]);

  return (
    <Container onClick={() => setCollapse(!collapse)} clicked={collapse}>
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

      <Reveal clicked={collapse}>{children}</Reveal>
    </Container>
  );
};

export default Accordion;

import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { media } from "../../styles/Themes";
const Vimeo = () => {
  // https://vimeo.com/manage/videos/733240801
  return (
    <Section>
      <MainTitle>High Minded Intelligence</MainTitle>
      <VimeoContainer>
        <ReactPlayer url="https://vimeo.com/733240801" width={`100%`} />
      </VimeoContainer>
    </Section>
  );
};

export default Vimeo;

const MainTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Saira-Black";
  color: ${(props) => props.theme.primary};
  font-size: ${(props) => props.theme.font2xl};
  text-transform: uppercase;
  ${media[768]} {
    font-size: ${(props) => props.theme.fontxl};
  }
  padding-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  padding: 14rem 0;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${media[768]} {
    padding: 7rem 0;
  }
`;

const VimeoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  > div {
    width: 100%;
    height: 460px !important;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    ${media[768]} {
      width: 90% !important;
      height: auto !important;
    }
  }
`;

import React from "react";
import styled from "styled-components";
import { media } from "../../styles/Themes";

const HomeV2 = () => {
  return (
    <Section id="home">
      <Video
        src="/vid/hi-planet-main-vid-v2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </Section>
  );
};

export default HomeV2;
const Section = styled.section`
  min-height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
  background: ${(props) => props.theme.text};
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${(props) => props.theme.navHeight};
`;

const Video = styled.video`
  width: 60%;
  object-fit: cover;
  position: absolute;
  ${media[768]} {
    width: 100%;
  }
`;

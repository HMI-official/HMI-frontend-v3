import React from "react";
import styled from "styled-components";

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
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video`
  width: 60%;
  object-fit: cover;
`;

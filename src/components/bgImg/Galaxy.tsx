import React from "react";
import styled from "styled-components";

const Galaxy = () => {
  return (
    <Container>
      <TopOverlay />
      <img src="/images/bg-imgs/astronomy.png" alt="galaxy" />
      <Overlay />
    </Container>
  );
};

export default Galaxy;

const Container = styled.div`
  width: 100%;
  position: absolute;
  z-index: -1;
  opacity: 0.7;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Overlay = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 35rem;

  background: linear-gradient(180deg, rgba(47, 39, 131, 0) 0%, #000000 100%);
`;

const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 35rem;
  z-index: 4;
  background: linear-gradient(to top, rgba(47, 39, 131, 0) 0%, #000000 100%);
  /* background: linear-gradient(to right, blue, pink); */
`;

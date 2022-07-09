import React from "react";
import styled from "styled-components";
import { ETC_IMAGES } from "../../constants/image";
import { media } from "../../styles/Themes";

const Galaxy = () => {
  return (
    <Container>
      {/* <TopOverlay /> */}
      <img src={ETC_IMAGES.bg2} alt="galaxy" />
      {/* <img src="/images/bg-imgs/astronomy.png" alt="galaxy" /> */}
      <Overlay />
    </Container>
  );
};

export default Galaxy;

const Container = styled.div`
  width: 100%;
  position: fixed;
  z-index: -1;
  opacity: 0.8;
  top: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${media.mobile} {
    height: 100%;
    /* background-image: url(${ETC_IMAGES.bg2}); */

    /* background-image size to 50% */
    /* background-size: 40%; */
    /* background-size: cover; */
    /* background-position: center; */
    /* background-repeat: no-repeat; */

    /* width: 40rem; */
    /* top: 50%; */
    /* opacity: 1; */
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

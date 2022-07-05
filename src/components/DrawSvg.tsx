import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Vector from "../Icons/Vector";

const VectorContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  overflow: hidden;

  svg {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 48em) {
    left: 1rem;
  }
`;
const Bounce = keyframes`
from {  transform: translateX(-50%) scale(0.5);   }
to {  transform: translateX(-50%) scale(1);   }
`;

const Ball = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.text};
  animation: ${Bounce} 0.5s linear infinite alternate;

  @media (max-width: 48em) {
    left: 1rem;
  }
`;

const DrawSvg = () => {
  const ref = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  // gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    console.log(ref.current);
    let element = ref.current;

    let svg = document.getElementsByClassName(
      "svg-path"
    )[0] as SVGGeometryElement;

    const length = svg.getTotalLength();
    //   start positioning of svg drawing
    svg.style.strokeDasharray = length.toString();
    // Hide svg before scrolling start
    svg.style.strokeDashoffset = length.toString();

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom bottom",
        // markers: true,
        onUpdate: (self) => {
          const draw = length * self.progress;
          console.log("draw: ", draw);
          // also reverse the drawing when scroll goes up
          svg.style.strokeDashoffset = (length - draw).toString();
        },
        onToggle: (self) => {
          if (self.isActive) {
            // console.log("Scrolling is active");
            if (!ballRef.current) return;
            ballRef.current.style.display = "none";
          } else {
            if (!ballRef.current) return;
            // console.log("Scrolling is not active");
            ballRef.current.style.display = "inline-block";
          }
        },
      },
    });

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <>
      <Ball ref={ballRef} />
      <VectorContainer ref={ref}>
        <Vector />
      </VectorContainer>
    </>
  );
};

export default DrawSvg;

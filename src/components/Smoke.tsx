import styled, { keyframes } from "styled-components";

const anim = keyframes`
    0% {
      box-shadow: 0 0 50px #fff, inset 0 0 50px #fff;
    }
    20% {
      box-shadow: 0 0 50px #f00, inset 0 0 50px #f00;
    }
    40% {
      box-shadow: 0 0 50px #ff0, inset 0 0 50px #ff0;
    }
    60% {
      box-shadow: 0 0 50px #0ff, inset 0 0 50px #0ff;
    }
    80% {
      box-shadow: 0 0 50px #f0f, inset 0 0 50px #f0f;
    }
  `;

const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;
const SmokeEl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: lightcoral; */

  width: 100%;
  height: 100%;
  .circle {
    position: relative;
    height: 500px;
    /* width: 100%; */
    /* height: 100%; */
    width: 500px;
    filter: url(#wave);
    animation: ${rotate} 30s linear infinite;

    ::before {
      content: "";
      position: absolute;
      top: 100px;
      left: 100px;
      right: 100px;
      bottom: 100px;
      border: 10px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 50px #fff, inset 0 0 50px #fff;
      filter: url(#wave) blur(10px);
      animation: ${anim} 4s linear infinite;
    }
  }

  svg {
    display: none;
  }
`;

const Smoke = () => {
  return (
    <SmokeEl>
      <div className="circle"></div>
      <div className="circle2"></div>

      <svg>
        <filter id="wave">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.009"
            numOctaves="5"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              dur="30s"
              values="0.02;0.005;0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </svg>
    </SmokeEl>
  );
};

export default Smoke;

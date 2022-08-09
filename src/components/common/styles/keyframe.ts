import { keyframes } from "styled-components";

export const flash = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  60% {
    opacity: 0.3;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

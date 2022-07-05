import { FC, ReactNode } from "react";
import styled, { css } from "styled-components";
import Loading from "../components/Loading";
interface Props {
  children: ReactNode;
  loaded: boolean;
}

const LoaderWrapper = styled.div<{ isLoaded: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 700ms;

  ${({ isLoaded }) =>
    isLoaded
      ? css`
          visibility: hidden;
          opacity: 0;
        `
      : css`
          visibility: visible;
          opacity: 1;
        `}
  .loader--container {
    background: black;
  }
`;

const LoadComponent: FC<Props> = (props) => {
  const LoaderContainer = () => {
    return (
      <LoaderWrapper isLoaded={props.loaded}>
        <Loading />
      </LoaderWrapper>
    );
  };

  return (
    <>
      {props.children}
      {LoaderContainer()}
    </>
  );
};

export default LoadComponent;

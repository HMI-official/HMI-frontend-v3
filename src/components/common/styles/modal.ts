import styled, { css } from "styled-components";

export const Overlay = styled.div<{ isOpen: boolean }>`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.body};
`;
export const Window = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  width: 22rem;
  /* height: 8rem; */
  gap: 1rem;
  > div {
    width: 80%;
  }
`;

export const Header = styled.div`
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  /* text-align: center; */
  /* transform: translateY(10px); */
`;
export const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;
export const Btn = styled.div<{ isDark: boolean }>`
  cursor: pointer;
  border-radius: 0.5rem;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  font-weight: 500;
  ${({ isDark }) =>
    isDark
      ? css`
          background-color: #000;
          color: #fff;
        `
      : css`
          background-color: #fff;
          color: #000;
          font-weight: 300;
        `};
`;

export const IconWrapper = styled.div`
  width: fit-content !important;
  margin: 0.81rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5em;
  cursor: pointer;
`;

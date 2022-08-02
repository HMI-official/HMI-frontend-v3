import React from "react";
import styled from "styled-components";
import {
  Body,
  Btn,
  Footer,
  Header,
  Overlay,
  Window,
} from "../common/styles/modal";

const WlModal = () => {
  return (
    <Overlay isOpen={true}>
      <Window>
        <Header>please add your wl address</Header>
        <Body>
          <Input type="text" placeholder="wl address" />
        </Body>
        <Footer>
          <Btn isDark={true}>confirm</Btn>
          <Btn isDark={false}>cancel</Btn>
        </Footer>
      </Window>
    </Overlay>
  );
};

export default WlModal;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

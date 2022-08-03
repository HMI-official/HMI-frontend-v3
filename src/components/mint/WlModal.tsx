import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { useMintConfig } from "../../routes/minting";
import { getWlWalletIsValid } from "../../utils/merkleTree";
import { errorNotify } from "../../utils/toast";
import {
  Body,
  Btn,
  Footer,
  Header,
  Overlay,
  Window,
} from "../common/styles/modal";

interface WlModalProps {
  isOpen: boolean;
  closeWlModal: () => void;
  handleClickWlModalConfirm: () => void;
}

const WlModal: FC<WlModalProps> = ({
  isOpen,
  closeWlModal,
  handleClickWlModalConfirm,
}) => {
  const { winterWlWallet, setWinterWlWallet, setIsWinterWlModalOpen } =
    useMintConfig();
  const onChangeWl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWinterWlWallet(e.target.value);
  };

  const onClickConfirm = () => {
    const isValid = getWlWalletIsValid(winterWlWallet);
    if (!isValid) return errorNotify("please connect your wl wallet");
    setIsWinterWlModalOpen(false);
    handleClickWlModalConfirm();
  };

  useEffect(() => {
    // stop scroll
    const body = document.querySelector("body");
    if (!body) return;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  }, []);
  return (
    <Overlay isOpen={isOpen}>
      <Window>
        <HeaderEl>
          please add your wl address
          <br />
          <span>
            (❗ only <span className="wallet__name">metamask</span> wallet is
            supported)
          </span>
        </HeaderEl>
        <Body>
          <Input
            type="text"
            placeholder="wl address"
            onChange={onChangeWl}
            value={winterWlWallet}
          />
        </Body>
        <Footer>
          <Btn isDark={true} onClick={onClickConfirm}>
            confirm
          </Btn>
          <Btn isDark={false} onClick={closeWlModal}>
            cancel
          </Btn>
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

const HeaderEl = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > span {
    font-size: 0.9rem;
    color: #999;

    /* padding-bottom: 1rem; */
  }
  .wallet__name {
    color: #f5a623;
    font-family: "Saira-Black", sans-serif;
    text-transform: uppercase;
  }
`;

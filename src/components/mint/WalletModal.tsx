import React, { FC, useEffect } from "react";
import styled from "styled-components";
// import { useMintConfig } from "../../routes/minting";
import { getWlProof, getWlWalletIsValid } from "../../utils/merkleTree";
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
  handleClickWalletModalConfirm: () => void;
  closeWalletModal: () => void;
}

const WalletModal: FC<WlModalProps> = ({
  isOpen,
  handleClickWalletModalConfirm,
  closeWalletModal,
}) => {
  // const { winterWlWallet, setWinterWlWallet, setIsWinterWlModalOpen } =
  //   useMintConfig();
  const winterWlWallet = "0x";
  const setWinterWlWallet = () => {};
  const setIsWinterWlModalOpen = () => {};
  const onChangeWl = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setWinterWlWallet(e.target.value);
  };

  const onClickConfirm = () => {
    const isValid = getWlWalletIsValid(winterWlWallet);
    console.log(getWlProof(winterWlWallet));
    if (!isValid) return errorNotify("please connect your wl wallet");
    // setIsWinterWlModalOpen(false);
    handleClickWalletModalConfirm();
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
          <Btn isDark={false} onClick={closeWalletModal}>
            cancel
          </Btn>
        </Footer>
      </Window>
    </Overlay>
  );
};

export default WalletModal;

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

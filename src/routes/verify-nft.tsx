import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fetchWallet } from "../api/verify-nft";
import { useAccount } from "../contexts/AccountContext";
import { signAccount } from "../utils/wallet";

interface ITokenInfo {
  accessToken: string;
  tokenType: string;
}
const tokenInfoInitialState: ITokenInfo = {
  accessToken: "",
  tokenType: "",
};
const VerifyNft = () => {
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>(tokenInfoInitialState);
  const getAccount = useAccount()?.getAccount;

  const onClickVerify = async () => {
    if (!getAccount) return;
    const account = await getAccount();
    if (!account) return;
    const { signature, message } = await signAccount(account);
    const { accessToken, tokenType } = tokenInfo;
    if (accessToken.length === 0 || tokenType.length === 0) return;
    const result = await fetchWallet({
      account,
      signature,
      message,
      token: `${tokenType} ${accessToken}`,
    });
    console.log(result);
    if (!result) return;
    const { status, message: resultMsg, data } = result;
    if (status) {
      const { wallet } = data;
    } else {
      console.log(resultMsg);
    }
  };

  useEffect(() => {
    const init = async () => {
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
      ];
      if (!accessToken || !tokenType) return;
      setTokenInfo({ accessToken, tokenType });
    };
    init();
  }, []);
  return (
    <Section>
      <span className="title">verify wallet</span>
      <div className="btn__container">
        <span className="bn5" onClick={onClickVerify}>
          verify
        </span>
      </div>
      <div className="status__container">
        <div className="status__message">
          <div></div>
        </div>
        <div className="status__wallet"></div>
      </div>
    </Section>
  );
};

export default VerifyNft;

const glowingbn5 = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

const Section = styled.section`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn__container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
  }
  .title {
    padding-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 800;
  }
  .bn5 {
    padding: 0.6em 2em;
    border: none;
    outline: none;
    color: rgb(255, 255, 255);
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
  }

  .bn5:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowingbn5} 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  .bn5:before {
    opacity: 1;
  }

  .bn5:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #191919;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  .status__container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid #ccc; */
    border-radius: 10px;
    flex-direction: column;
    padding: 1rem;
    visibility: hidden;

    background: rgba(255, 255, 255, 0.2);

    /* width: 300px; */
    /* height: 300px; */
  }
  .status__message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .status__message > div {
    color: var(--primary);
  }
  .status__wallet {
    word-break: break-all;
  }
`;

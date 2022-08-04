import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fetchWallet } from "../api/verify-nft";
import { ETC_IMAGES } from "../constants/image";
import { useAccount } from "../contexts/AccountContext";
import { media } from "../styles/Themes";
import { onClickWebsite } from "../utils/common";
import { signAccount } from "../utils/wallet";

interface ITokenInfo {
  accessToken: string;
  tokenType: string;
}
const tokenInfoInitialState: ITokenInfo = {
  accessToken: "",
  tokenType: "",
};

interface IVerified {
  verified: boolean;
  message: string;
  sent: boolean;
  wallet?: string;
}

const verifyInit = { verified: false, message: "", sent: false };
const VerifyNft = () => {
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>(tokenInfoInitialState);
  const [verified, setVerified] = useState<IVerified>(verifyInit);
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
      setVerified({ verified: true, message: resultMsg, sent: true, wallet });
    } else {
      console.log(resultMsg);
      setVerified({ verified: false, message: resultMsg, sent: true });
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

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    body.style.backgroundImage =
      "linear-gradient(to right, #434343 10%, black 100%)";
    // /* background-image: linear-gradient(to right, #434343 0%, black 100%); */
    return () => {
      body.style.backgroundImage = "";
    };
  }, []);

  const StatusComponent = (
    <StatusContainer isSent={verified.sent}>
      <div className="status__message">
        <StatusTitle>{verified.message}</StatusTitle>
      </div>
      <div className="status__wallet">{verified.wallet}</div>
      <TokenInfoContainer verified={verified.verified}>
        <StatusTitle>HI-PLANET TOKEN NUMBER</StatusTitle>
        <span>3</span>
      </TokenInfoContainer>
      <CouponInfoContainer verified={verified.verified}>
        <StatusTitle>Welcome-Package Coupon</StatusTitle>
        <span>962175644437991505/1004634382205714433</span>
      </CouponInfoContainer>
      <LinkContainer verified={verified.verified}>
        <StatusTitle
          style={{ cursor: "pointer" }}
          onClick={() => onClickWebsite("https://highmindedi.com/")}
        >
          go to HMI hompage
        </StatusTitle>
      </LinkContainer>
    </StatusContainer>
  );

  return (
    <Section>
      <span className="title">verify wallet</span>
      <div className="btn__container">
        {!verified.verified && (
          <span className="bn5" onClick={onClickVerify}>
            verify
          </span>
        )}
      </div>
      {verified.sent && StatusComponent}

      <Image src={ETC_IMAGES.crown} />
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
  /* background-image: linear-gradient(to right, #434343 0%, black 100%); */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

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
    text-transform: capitalize;
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
`;

const StatusContainer = styled.div<{ isSent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  flex-direction: column;
  padding: 1rem;
  visibility: ${({ isSent }) => (isSent ? "visible" : "hidden")};
  background: rgba(255, 255, 255, 0.2);

  /* width: 300px; */
  /* height: 300px; */
  .status__message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  /* .status__message > div { */
  /* color: var(--primary); */
  /* } */
  .status__wallet {
    word-break: break-all;
  }
`;

const TokenInfoContainer = styled.div<{ verified: boolean }>`
  display: ${({ verified }) => (verified ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StatusTitle = styled.span`
  font-weight: 600;
  background: ${(props) => props.theme["--chakra-colors-teal-400"]};
  text-transform: uppercase;
`;

const CouponInfoContainer = styled.div<{ verified: boolean }>`
  display: ${({ verified }) => (verified ? "flex" : "none")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LinkContainer = styled.div<{ verified: boolean }>`
  display: ${({ verified }) => (verified ? "flex" : "none")};
  padding-top: 1rem;
  span {
    border-radius: 0.2rem;
    padding: 0.3rem;
    border: 1px solid white;
    background: transparent;
    transition: all 0.2s ease-in-out;
    :hover {
      border-color: ${(props) => props.theme["--chakra-colors-teal-400"]};
    }
  }
`;

const Image = styled.img`
  position: absolute;
  width: 30rem;
  object-fit: contain;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: -1;
  opacity: 0.24;
  ${media[768]} {
    width: 20rem;
  }
  ${media.mobile} {
    width: 15rem;
  }
`;

import { createContext, FC, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled, { css, ThemeProvider } from "styled-components";
// import { keccak256 } from "web3-utils";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { dark, media } from "../styles/Themes";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { HMI_GIF } from "../constants/image";
import { Link } from "react-router-dom";
// import ElectricLoader from "../components/ElectricLoader";
// import { initOnboard } from '../hooks/onboard'
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
// import useWeb3Onboard from "../hooks/useWeb3Onboard ";
// import { WinterCheckout } from "@usewinter/checkout";

import { initOnboard } from "../utils/onboard";
import { OnboardAPI } from "@web3-onboard/core";
import { cutAccount } from "../utils/wallet";
import {
  getMaxSupply,
  getTotalMinted,
  isPausedState,
  isPreSaleState,
  isOgSaleState,
  isPublicSaleState,
  presaleMint,
  ogSaleMint,
  publicMint,
  getWlClaimed,
  getOgClaimed,
  initMintTimeCompliance,
} from "../utils/interact";
import { IMintStatus } from "../interfaces";
// import { config } from "process";

import { config } from "../web3Config";
import LoadComponent from "../utils/LoadComponent";
import { cutDecimalZero } from "../utils/common";
// import { errorNotify, toastNotify } from "../utils/toast";
// import { getWlProof, getWlWalletIsValid } from "../utils/merkleTree";
import { publicCrossmintConfig, wlCrossmintConfig } from "../config/crossmint";
import {
  IMintComponentConfig,
  mintCommonConfigInit,
} from "../interfaces/crossmint";
import { getLeaf, getProof } from "../utils/merkleTree";
import { WL_MERKLE_INFO } from "../constants/merkleRoot";

const Minting: FC = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();
  const userWallet = wallet?.accounts[0].address;

  const [onboard, setOnboard] = useState<OnboardAPI | null>(null);
  const [mintAmount, setMintAmount] = useState<number>(1);
  const [maxMintAmount, setMaxMintAmount] = useState<number>(6);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintStatus, setMintStatus] = useState<IMintStatus | null>(null);
  const [maxSupply, setMaxSupply] = useState<number>(0);
  const [totalMinted, setTotalMinted] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [isPublicSale, setIsPublicSale] = useState<boolean>(false);
  const [isPreSale, setIsPreSale] = useState<boolean>(false);
  const [isOgSale, setIsOgSale] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [mintConfig, setMintConfig] =
    useState<IMintComponentConfig>(mintCommonConfigInit);
  const [wlClaimed, setWlClaimed] = useState<number>(0);
  const [ogClaimed, setOgClaimed] = useState<number>(0);

  const wlTotalPrice = cutDecimalZero(
    config.wlPrice * mintAmount,
    config.wlPrice.toString().length
  );

  const totalPublicPrice = () => {
    const _length = config.price.toString().length + 1;

    switch (true) {
      case mintAmount >= 1 && mintAmount < 5:
        return cutDecimalZero(config.price * mintAmount, _length);
      case mintAmount >= 5 && mintAmount < 10:
        return cutDecimalZero(config.price * 0.9 * mintAmount, _length);
      case mintAmount >= 10:
        return cutDecimalZero(config.price * 0.8 * mintAmount, _length);
      default:
        return cutDecimalZero(config.price * mintAmount, _length);
    }
  };

  const crossmintConfig = () => {
    if (isPreSale) return wlCrossmintConfig;
    if (!isPreSale) return publicCrossmintConfig;
  };

  // FIXME: onClick events

  const getMaxMintAmount = (
    _isPublicSale: boolean,
    _isPreSale: boolean,
    _isOgSale: boolean
  ) => {
    switch (true) {
      case _isPublicSale:
        return config.maxMintAmount;
      case _isPreSale:
        return config.presaleMaxMintAmount - wlClaimed;
      case _isOgSale:
        return config.ogMaxMintAmount - ogClaimed;
      default:
        return config.maxMintAmount;
    }
  };
  const handleIncrementMintAmount = () => {
    if (mintAmount < maxMintAmount) setMintAmount(mintAmount + 1);
  };

  const handleDecrementMintAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  const handleOgSaleMint = async () => {
    setIsMinting(true);

    const { success, status } = await ogSaleMint(mintAmount);

    setMintStatus({
      success,
      message: status,
    });
    setIsMinting(false);
    await handleGetMaxMintAmount();
  };

  const handlePresaleMint = async () => {
    setIsMinting(true);

    const { success, status } = await presaleMint(
      mintAmount,
      mintConfig.totalPrice
    );

    setMintStatus({
      success,
      message: status,
    });
    setIsMinting(false);
    await handleGetMaxMintAmount();
  };

  const handlePublicMint = async () => {
    const _wallet = wallet?.accounts[0]?.address!;
    // fot loading
    setIsMinting(true);
    // get status
    const { success, status } = await publicMint(
      mintAmount,
      _wallet,
      mintConfig.totalPrice
    );
    // set status

    setMintStatus({
      success,
      message: status,
    });

    setIsMinting(false);

    if (success) setTotalMinted(await getTotalMinted());

    // console.log(status);
  };

  const onClickConnect = () =>
    connect({ autoSelect: { label: "string", disableModals: false } });

  const handleGetMaxMintAmount = async () => {
    const _maxMintAmount = await getMaxMintAmount(
      isPublicSale,
      isPreSale,
      isOgSale
    );
    setMaxMintAmount(_maxMintAmount);
  };

  // FIXME:  setting onboard
  // initialize onboard
  useEffect(() => setOnboard(initOnboard), []);

  useEffect(() => {
    if (!userWallet) return;
  }, []);

  useEffect(() => {
    if (!userWallet) return;
    const main = async () => {
      const _leaf = getLeaf(userWallet);

      const _totalPrice = () => {
        if (isPreSale) {
          return wlTotalPrice.toString();
        } else if (isOgSale) {
          return "0";
        } else {
          return totalPublicPrice().toString();
        }
      };
      let _mintConfig: IMintComponentConfig = {
        totalPrice: _totalPrice(),
        _mintAmount: mintAmount,
        receiver: userWallet,
      };
      const proof = getProof(WL_MERKLE_INFO.wlMerkleTree, _leaf);
      if (isPreSale) _mintConfig = { ..._mintConfig, _merkleProof: proof };
      setMintConfig(_mintConfig);
    };
    main();
  }, [userWallet, mintAmount, isPreSale, isOgSale]);

  // set local storage if wallet is connected
  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  // if local storage has connected wallets, set them to connectedWallets
  useEffect(() => {
    if (!onboard) return;
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets") || "123"
    );

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true,
          },
        });
      }

      setWalletFromLocalStorage();
    }
  }, [onboard, connect]);

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply());
      setTotalMinted(await getTotalMinted());

      setPaused(await isPausedState());
      const { ogMintTimeResponse, publicMintTimeResponse, wlMintTimeResponse } =
        await initMintTimeCompliance();

      const _isPublicSale =
        (await isPublicSaleState()) && publicMintTimeResponse.success;
      const _isPreSale = (await isPreSaleState()) && wlMintTimeResponse.success;
      const _isOgSale = (await isOgSaleState()) && ogMintTimeResponse.success;
      // 여기서 시간도 가지고오기

      setIsPublicSale(_isPublicSale);
      setIsPreSale(_isPreSale);
      setIsOgSale(_isOgSale);
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      await handleGetMaxMintAmount();
      // const _maxMintAmount = await getMaxMintAmount(
      //   isPublicSale,
      //   isPreSale,
      //   isOgSale
      // );
      // setMaxMintAmount(_maxMintAmount);
      // if (mintAmount > _maxMintAmount) setMintAmount(_maxMintAmount);
    };
    init();
  }, [isPublicSale, isPreSale, isOgSale]);

  useEffect(() => {
    if (!userWallet) return;
    const init = async () => {
      setWlClaimed(await getWlClaimed(userWallet));
      setOgClaimed(await getOgClaimed(userWallet));
    };
    init();
  }, [userWallet]);

  useEffect(() => {
    const timer = setInterval(async () => {
      setTotalMinted(await getTotalMinted());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [totalMinted]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => {
      setIsLoaded(false);
      clearTimeout(timer);
    };
  }, []);

  // FIXME: components
  const ButtonComponent = () => {
    // TODO:  maxMintAmount 업데이트해주기 민팅한 다음에
    const isNotValid = paused || (!isPreSale && !isPublicSale && !isOgSale);
    const maxMintAmountExceeded = maxMintAmount === 0;

    const onClickMint = async () => {
      if (isNotValid) return;
      switch (true) {
        case isOgSale:
          await handleOgSaleMint();
          // await handleGetMaxMintAmount();
          break;
        case isPreSale:
          await handlePresaleMint();

          break;
        case isPublicSale:
          await handlePublicMint();
          break;
        default:
          break;
      }
    };

    switch (true) {
      case isMinting:
        return <Button isNotValid={isMinting}>ON PROCESS</Button>;
      case !wallet:
        return <Button onClick={onClickConnect}>CONNECT</Button>;
      case isNotValid:
        return <Button isNotValid={isNotValid}>disabled</Button>;
      case !isPublicSale && maxMintAmountExceeded:
        return (
          <Button isNotValid={true}>
            you already claimed{" "}
            {isPreSale ? config.presaleMaxMintAmount : config.ogMaxMintAmount}{" "}
            tokens {isPreSale ? "(wl)" : "(og)"}
          </Button>
        );
      default:
        return <Button onClick={onClickMint}>Buy with ETH</Button>;
    }
  };

  const TitleComponent = () => {
    if (paused || (!isPreSale && !isPublicSale && !isOgSale)) return "Paused";
    if (isOgSale) return "OG Mint";
    if (isPreSale) return "Pre-Sale";
    if (isPublicSale) return "Public Sale";
  };
  const StatusComponent = () => (
    <StatusWrapper>{mintStatus?.message}</StatusWrapper>
  );

  return (
    <ThemeProvider theme={dark}>
      {/* <MintConfigContext.Provider value={value}> */}
      <Section>
        <LoadComponent loaded={isLoaded}>
          {/* <Cover src="/images/blur.jpeg" alt="" /> */}
          <ModalContainer>
            <Header>
              <div className="item1">
                <Link to="/">
                  <IoIosArrowBack />
                </Link>
              </div>
              <h1>{TitleComponent()}</h1>
              {wallet && <h3>{cutAccount(wallet?.accounts[0]?.address)}</h3>}
              {!wallet && <h3>connect wallet</h3>}
              {wallet && (
                <DisconnectButton
                  onClick={() => disconnect({ label: wallet.label })}
                >
                  disconnect
                </DisconnectButton>
              )}
            </Header>
            <Body>
              <Box className="box1">
                <ImgWarpper>
                  {/* <MainImg src={HMI_GIF} alt="gif" /> */}
                  <MainVideo
                    src="/vid/hidden-vid.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  <Indicator>
                    <span>{totalMinted}</span> \ {maxSupply}
                  </Indicator>
                </ImgWarpper>
              </Box>
              <Box className="box2">
                {/* <Wrapper> */}
                <Counter>
                  <button onClick={handleDecrementMintAmount}>
                    <AiOutlineMinus />
                  </button>
                  <p>{mintAmount}</p>
                  <button onClick={handleIncrementMintAmount}>
                    <AiOutlinePlus />
                  </button>
                </Counter>
                <div>
                  Max Mint Amount:{" "}
                  {isPreSale
                    ? config.presaleMaxMintAmount
                    : config.maxMintAmount}
                </div>
                <Receipt>
                  <div className="item1"> Total</div>{" "}
                  <div className="item2">
                    <span>
                      {mintConfig.totalPrice}
                      ETH
                    </span>{" "}
                    <span>+ GAS</span>
                  </div>
                </Receipt>
                <Desc>
                  <span>(When you buy 5+ : 10% Discount)</span>
                  <span>(When you buy 10 : 20% Discount)</span>
                </Desc>
                {ButtonComponent()}
                <CrossmintPayButton
                  collectionTitle={
                    crossmintConfig()?.collectionTitle ?? "smth went wrong"
                  }
                  collectionDescription={
                    crossmintConfig()?.collectionDescription ??
                    "smth went wrong"
                  }
                  collectionPhoto={
                    crossmintConfig()?.collectionPhoto ?? "smth went wrong"
                  }
                  clientId={crossmintConfig()?.clientId ?? "smth went wrong"}
                  // environment={
                  //   crossmintConfig()?.environment ?? "smth went wrong"
                  // }
                  mintConfig={mintConfig as any}
                  disabled={
                    !userWallet || (!isPreSale && !isPublicSale && !isOgSale)
                  }
                />
              </Box>
            </Body>
            <Footer>
              {StatusComponent()}
              <h2>CONTRACT ADDRESS</h2>
              <a
                href={`https://etherscan.io/address/${config.MINT_NFT_ADDRESS}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{config.MINT_NFT_ADDRESS}</p>
              </a>
            </Footer>
          </ModalContainer>
        </LoadComponent>
        <ToastContainer />
      </Section>
    </ThemeProvider>
  );
};

export default Minting;

const Section = styled.section`
  display: flex;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: calc(100vh + ${(props) => props.theme.navHeight});
  position: relative;
  color: ${(props) => props.theme.text};
  ${media[768]} {
    overflow-y: auto;
  }
`;

const Cover = styled.img`
  display: block;
  position: absolute;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  width: 100%;
  min-height: 100vh;
`;

const ModalContainer = styled.div`
  display: flex;
  position: relative;

  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  width: 44rem;
  border-radius: 0.375rem;
  backdrop-filter: var(4);
  background-color: #111827;

  ${media[768]} {
    width: 100%;
  }

  @media (min-width: 768px) {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    max-width: 48rem;
  }
`;

const Header = styled.div`
  width: 100%;
  font-family: "Montserrat";
  text-align: center;
  position: relative;
  .item1 {
    position: absolute;
    left: 0;
    top: 25%;
    font-size: 1.5rem;
    cursor: pointer;
  }
  h1 {
    color: var(--clr-green);
    font-weight: 900;
  }
  h3 {
    font-weight: 400;
    color: ${(props) => props.theme.gray3};
  }
  ${media[768]} {
    .item1 {
      left: 3%;
    }
  }
`;
const Body = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3rem;
  .box2 {
    margin-left: 2rem;
    ${media[768]} {
      /* margin-left: 0; */
      margin-right: 2rem;
    }

    > div:nth-child(2) {
      padding-top: 1.2rem;
      /* background-color: transparent; */
    }
  }
  .box1 {
    align-items: flex-start;
    justify-content: flex-start;
    ${media[768]} {
      align-items: center;
      justify-content: center;
    }
  }
  ${media[768]} {
    gap: 4rem;
    flex-direction: column;
  }
`;

const Footer = styled.div`
  padding-top: 2rem;
  text-align: center;
  h2 {
    padding: 1rem;
  }
  p {
    font-weight: 200;
    cursor: pointer;
    word-break: break-all;
    ${media[768]} {
      padding: 0 1rem;
    }
  }
`;
const Box = styled.div`
  /* width: 50%; */
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Counter = styled.div`
  display: flex;
  width: 100%;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    /* reset button css */
    border: none;
    padding: 0;
    /* background: none; */
    cursor: pointer;
    outline: none;
    font-size: ${(props) => props.theme.fontxl};
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    background: none;
    color: ${(props) => props.theme.text};
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    font-size: ${(props) => props.theme.fontxl};
    font-weight: 900;
    font-family: "Montserrat";
  }
  /* button */
`;
const Receipt = styled.div`
  margin-top: 3rem;
  border-bottom: 1px solid ${(props) => props.theme.gray1};
  border-top: 1px solid ${(props) => props.theme.gray1};
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: ${(props) => props.theme.fontlg};
  > div {
    flex: 1;
  }
  .item1,
  .item2 > span:nth-child(1) {
    color: ${(props) => props.theme["--chakra-colors-teal-200"]};
  }

  .item2 > span:nth-child(2) {
    color: ${(props) => props.theme.gray2};
  }
`;
const Button = styled.button<{ isNotValid?: boolean }>`
  width: 100%;
  font-size: calc(${(props) => props.theme.fontxl} - 7px);
  margin-top: 2rem;
  border-radius: 10px;
  padding: 0.4rem 0;
  cursor: ${({ isNotValid }) => (isNotValid ? "not-allowed" : "pointer")};
  font-family: "Montserrat";
  font-weight: 700;

  background-image: ${({ isNotValid }) =>
    isNotValid
      ? css``
      : css`
  linear-gradient(
    to right,
    #ff6e7f 0%,
    #bfe9ff 51%,
    #ff6e7f 100%
  );
  `};
  text-align: center;
  /* text-transform: uppercase; */
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;

  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgWarpper = styled.div`
  border: 2px solid ${(props) => props.theme.gray3};
  border-radius: 10px;
  /* width: 280px; */
  width: 340px;
  height: 340px;
  /* height: 280px; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .icon {
    font-size: 4rem;
    text-shadow: 4px 2px 2px gray;
  }

  img {
    padding: 1rem;
    object-fit: contain;
  }
`;

const Indicator = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  border: ${(props) => props.theme["--chakra-colors-teal-400"]} solid 1.5px;
  border-radius: 5px;
  padding: 0.4rem;
  font-family: "Montserrat";
  font-weight: 900;
  span {
    color: ${(props) => props.theme["--chakra-colors-teal-400"]};
  }
`;

const ResetButton = styled.button`
  border-radius: 10px;
  padding: 0.4rem 0;
  font-family: "Montserrat";
  border: none;
  background: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

const DisconnectButton = styled(ResetButton)`
  position: absolute;
  top: 0;
  right: 0;
  div {
    width: 100%;
    height: 100%;
  }
`;

const StatusWrapper = styled.div`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.fontsm};
  background: var(--clr-selection-bg);

  word-break: break-word;
`;

const MainVideo = styled.video`
  /* width: 60%; */

  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  object-fit: cover;
  /* position: absolute; */
  /* ${media[768]} {
    width: 100%;
  } */
`;

const Desc = styled.span`
  color: ${(props) => props.theme.colors.gray400};
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 1rem;
  gap: 0.35rem;
`;

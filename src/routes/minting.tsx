import { FC, useEffect, useState } from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { dark, media } from "../styles/Themes";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { BsQuestionOctagon } from "react-icons/bs";
import { HMI_GIF } from "../constants/image";
import { Link } from "react-router-dom";
// import ElectricLoader from "../components/ElectricLoader";
// import { initOnboard } from '../hooks/onboard'
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
// import useWeb3Onboard from "../hooks/useWeb3Onboard ";

import { initOnboard } from "../utils/onboard";
import { OnboardAPI } from "@web3-onboard/core";
import { cutAccount } from "../utils/wallet";
import {
  getMaxSupply,
  getTotalMinted,
  isPausedState,
  isPreSaleState,
  isPublicSaleState,
  presaleMint,
  publicMint,
} from "../utils/interact";
import { IMintStatus } from "../interfaces";
// import { config } from "process";

import { config } from "../web3Config";
import Loading from "../components/Loading";
import LoadComponent from "../utils/LoadComponent";
const Section = styled.section`
  display: flex;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  color: ${(props) => props.theme.text};
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
`;
const Body = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3rem;
  .box2 {
    margin-left: 2rem;

    > div:nth-child(2) {
      padding-top: 1.2rem;
      /* background-color: transparent; */
    }
  }
  .box1 {
    align-items: flex-start;
    justify-content: flex-start;
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
    /* color: #8e95a2; */
    /* color: ${(props) => props.theme.gray1}; */
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
  font-size: ${(props) => props.theme.fontxl};
  margin-top: 3.4rem;
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
  text-transform: uppercase;
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
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  /* background-image: url("./images/random-card-bg-img.png"),
    radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%),
    radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%),
    radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%); */
  /* background-image: url(${HMI_GIF}) cover no-repeat; */
  /* background-repeat: repeat, no-repeat, no-repeat, no-repeat; */
  /* background: url(${HMI_GIF}) no-repeat center; */
  .icon {
    /* color: black; */
    font-size: 4rem;
    text-shadow: 4px 2px 2px gray;
    /* text-transform: uppercase; */
    /* background: linear-gradient(to right, #30cfd0 0%, #330867 100%); */
    /* -webkit-background-clip: text; */
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

const Minting: FC = () => {
  // const { initOnboard } = useWeb3Onboard();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();
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

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const initOnboard =

  // FIXME:  setting onboard
  // initialize onboard
  useEffect(() => setOnboard(initOnboard), []);

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

  // FIXME: onClick events
  const handleIncrementMintAmount = () => {
    if (mintAmount < maxMintAmount) setMintAmount(mintAmount + 1);
  };

  const handleDecrementMintAmount = () => {
    if (mintAmount > 1) setMintAmount(mintAmount - 1);
  };

  const handlePresaleMint = async () => {
    setIsMinting(true);

    const { success, status } = await presaleMint(mintAmount);

    setMintStatus({
      success,
      message: status,
    });
    setIsMinting(false);
  };

  const handlePublicMint = async () => {
    // fot loading
    setIsMinting(true);
    // get status
    const { success, status } = await publicMint(mintAmount);
    // set status

    setMintStatus({
      success,
      message: status,
    });

    setIsMinting(false);
    // console.log(status);
  };

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply());
      setTotalMinted(await getTotalMinted());

      setPaused(await isPausedState());
      setIsPublicSale(await isPublicSaleState());
      const _isPreSale = await isPreSaleState();
      setIsPreSale(_isPreSale);

      setMaxMintAmount(
        isPreSale ? config.presaleMaxMintAmount : config.maxMintAmount
      );
    };

    init();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => {
      setIsLoaded(false);
      clearTimeout(timer);
    };
  }, []);

  // FIXME: components
  const ButtonComponent = () => {
    const isNotValid = paused || (!isPreSale && !isPublicSale);

    const onClickConnect = () =>
      connect({ autoSelect: { label: "string", disableModals: false } });

    const onClickMint = () => {
      if (isNotValid) return;
      isPreSale ? handlePresaleMint() : handlePublicMint();
    };

    if (isMinting) return <Button isNotValid={isMinting}>ON PROCESS</Button>;

    if (!wallet) return <Button onClick={onClickConnect}>Connect</Button>;
    if (wallet && isNotValid)
      return <Button isNotValid={isNotValid}>not abled</Button>;
    if (wallet) return <Button onClick={onClickMint}>MINT</Button>;
  };

  const TitleComponent = () => {
    if (paused || (!isPreSale && !isPublicSale)) return "Paused";
    // if() return "Public Sale";
    if (isPreSale) return "Pre-Sale";
    if (!isPreSale) return "Public Sale";
  };
  const StatusComponent = () => (
    <StatusWrapper>{mintStatus?.message}</StatusWrapper>
  );

  // console.log(mintStatus);

  return (
    <ThemeProvider theme={dark}>
      <Section>
        <LoadComponent loaded={isLoaded}>
          <Cover src="/images/blur.jpeg" alt="" />
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
                  {/* <img src={img1} alt="hero" /> */}
                  {/* <BsQuestionOctagon className="icon" /> */}
                  {/* <ElectricLoader /> */}
                  <MainImg src={HMI_GIF} alt="gif" />

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
                <div>Max Mint Amount: 10</div>
                <Receipt>
                  <div className="item1"> Total</div>{" "}
                  <div className="item2">
                    <span>
                      {Number.parseFloat(
                        (config.price * mintAmount).toString()
                      ).toFixed(2)}
                      ETH
                    </span>{" "}
                    <span>+ GAS</span>
                  </div>
                </Receipt>
                {ButtonComponent()}
                {/* <Button>MINT</Button> */}
                {/* </Wrapper> */}
              </Box>
            </Body>
            <Footer>
              {StatusComponent()}
              <h2>CONTRACT ADDRESS</h2>
              <a
                href={`https://rinkeby.etherscan.io/address/${config.MINT_NFT_ADDRESS}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>{config.MINT_NFT_ADDRESS}</p>
              </a>
            </Footer>
          </ModalContainer>
        </LoadComponent>
      </Section>
    </ThemeProvider>
  );
};

export default Minting;

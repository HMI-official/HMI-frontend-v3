import { useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
// import {  } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ADDRESS } from "../constants/address";
import { ETC_IMAGES } from "../constants/image";
import { useAccount } from "../contexts/AccountContext";
import { cutAccount } from "../hooks";
import { onClickWebsite } from "../utils/common";
import Button, { WritingButton } from "./Button";
import { ConnectButton } from "./common/styles/buttons";
import Logo from "./Logo";

const Section = styled.section`
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100vw;
  color: ${(props) => props.theme.body};
  /* background-color: ${(props) => props.theme.text}; */
  /* background-color: ${(props) => `rgba(${props.theme.textRgba}, 1)`}; */
  background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.2)`};
`;
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 85%;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;

  .mobile {
    display: none;
  }

  @media (max-width: 64em) {
    .desktop {
      display: none;
    }
    .mobile {
      display: inline-block;
    }
  }
`;
const Menu = styled.ul<{ click: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  list-style: none;

  @media (max-width: 64em) {
    /* 1024 px */

    position: fixed;
    top: ${(props) => props.theme.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
    z-index: 50;
    background-color: ${(props) => `rgba(${props.theme.textRgba},0.85)`};
    /* background-color: ${(props) => `rgba(${props.theme.bodyRgba},0.85)`}; */
    backdrop-filter: blur(2px);

    transform: ${(props) =>
      props.click ? "translateY(0)" : `translateY(1000%)`};
    transition: all 0.3s ease;
    flex-direction: column;
    justify-content: center;

    touch-action: none;
  }
`;

const MenuItem = styled.li`
  margin: 0 1rem;
  /* color: ${(props) => props.theme.text}; */
  cursor: pointer;

  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    background: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }

  @media (max-width: 64em) {
    margin: 1rem 0;

    &::after {
      display: none;
    }
  }
`;
const HamburgerMenu = styled.span<{ click: boolean }>`
  width: ${(props) => (props.click ? "2rem" : "1.5rem")};

  height: 2px;
  background: ${(props) => props.theme.body};
  /* background: ${(props) => props.theme.text}; */

  position: absolute;
  top: 2rem;
  left: 90%;

  transform: ${(props) =>
    props.click
      ? "translateX(-100%) rotate(90deg)"
      : "translateX(-100%) rotate(0)"};

  display: none;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 64em) {
    /* 1024 px */
    display: flex;
  }

  &::after,
  &::before {
    content: " ";
    width: ${(props) => (props.click ? "1rem" : "1.5rem")};
    height: 2px;
    right: ${(props) => (props.click ? "-2px" : "0")};
    background: ${(props) => props.theme.body};
    position: absolute;
    transition: all 0.3s ease;
  }

  &::after {
    top: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(-40deg)" : "rotate(0)")};
  }
  &::before {
    bottom: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(40deg)" : "rotate(0)")};
  }
`;

const MobileBtnComponent = () => {
  const account = useAccount()?.account;
  const getAccount = useAccount()?.getAccount;

  return (
    <>
      {!account && (
        <MenuItem>
          <div className="mobile" onClick={getAccount}>
            <ConnectButton>Connect Wallet</ConnectButton>
            {/* <Button text="Connect Wallet" link="#" /> */}
          </div>
        </MenuItem>
      )}
      {account && (
        <MenuItem>
          <div className="mobile">
            <ConnectButton> {cutAccount(account)}</ConnectButton>
          </div>
        </MenuItem>
      )}
    </>
  );
};
const DesktopBtnComponent = () => {
  const account = useAccount()?.account;
  const getAccount = useAccount()?.getAccount;
  return (
    <>
      {!account && (
        <div className="desktop" onClick={getAccount}>
          <ConnectButton>Connect Wallet</ConnectButton>
          {/* <Button text="Connect Wallet" link="#" /> */}
        </div>
      )}
      {account && (
        <div className="desktop">
          <ConnectButton> {cutAccount(account)}</ConnectButton>
        </div>
      )}
    </>
  );
};

const Navigation = () => {
  const [click, setClick] = useState(false);

  const scrollTo = (id: string) => {
    let element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    setClick(!click);
  };

  return (
    <Section id="navigation">
      <NavBar>
        {/* <Logo /> */}
        <Logo />
        <HamburgerMenu click={click} onClick={() => setClick(!click)}>
          &nbsp;
        </HamburgerMenu>
        <Menu click={click}>
          <MenuItem onClick={() => scrollTo("home")}>Home</MenuItem>
          <MenuItem onClick={() => scrollTo("about")}>About</MenuItem>
          <MenuItem onClick={() => scrollTo("roadmap")}>Roadmap</MenuItem>
          <MenuItem onClick={() => scrollTo("showcase")}>Showcase</MenuItem>
          <MenuItem onClick={() => scrollTo("team")}>Team</MenuItem>
          <MenuItem onClick={() => scrollTo("faq")}>Faq</MenuItem>
          <MenuItem>
            <Link to="/">Mint</Link>
            {/* <Link to="/mint">Mint</Link> */}
          </MenuItem>
          <MobileBtnComponent />
          <DesktopBtnComponent />
          {/* <FaTwitter /> */}
          <SNSContainer>
            <Icon onClick={() => onClickWebsite(ADDRESS.twitter)}>
              <AiFillTwitterCircle />
            </Icon>
            <Icon onClick={() => onClickWebsite(ADDRESS.discord)}>
              <FaDiscord />
            </Icon>
          </SNSContainer>
        </Menu>
        <div />
      </NavBar>
    </Section>
  );
};

export default Navigation;

const SNSContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding-left: 1rem;
  font-size: 1.4rem;
  svg {
    cursor: pointer;
  }
`;

const Icon = styled.div``;

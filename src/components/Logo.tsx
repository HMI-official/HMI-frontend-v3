import { Link } from "react-router-dom";
import styled from "styled-components";
import { ETC_IMAGES } from "../constants/image";

const LogoText = styled.h1`
  font-family: "Akaya Telivigala", cursive;
  font-size: ${(props) => props.theme.fontxxxl};
  color: ${(props) => props.theme.text};
  transition: all 0.2s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 64em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
  img {
    width: 100px;
    object-fit: contain;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  transform: translateY(-6px);
`;

const Logo = () => {
  return (
    <LogoText>
      <Link to="/">
        <img src={ETC_IMAGES.logo} alt="logo" />
      </Link>
    </LogoText>
  );
};

export default Logo;

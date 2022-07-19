import styled from "styled-components";

export const Button = styled.button`
  background: rgba(${({ theme }) => theme.bodyRgba}, 0.2);
  /* border: none; */
  color: #fff;
  font-weight: 900;
  /* font-family: "Saira-Black"; */
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease-in-out;
  font-size: ${(props) => props.theme.fontlg};
  cursor: pointer;
  :hover {
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;

export const Button2 = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;

  width: 170px;
  height: 60px;

  background: linear-gradient(214.02deg, #b75cff 6.04%, #671ae4 92.95%);
  border-radius: 10px;
`;

export const ConnectButton = styled.div`
  width: 130px;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border: 2px solid transparent;
  border-radius: 20px;
  background-image: ${({ theme }) => theme.gradientBg},
    linear-gradient(214.02deg, #00ffeb 6.04%, #671ae4 92.95%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 10px;
  transition: all 0.3s ease-in-out;
  :hover {
    border: 2px solid ${({ theme }) => theme.primary};
  }
`;

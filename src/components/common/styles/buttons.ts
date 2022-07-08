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

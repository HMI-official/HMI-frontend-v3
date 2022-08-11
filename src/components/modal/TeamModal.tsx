import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { Overlay, Window } from "../common/styles/modal";

const text = `Ryan is an owner of a crypto mining business; he has handled more than 200+ mining systems and is currently managing a datacenter. Additionally, he has been servicing over 50 customers.\n
He knows how value and real utility is important when it comes to an NFT; he is confident to display the HI-Planet NFT project to the world. As a co-founder of HPN, Ryan takes on the role to lead the project in a realistic way with the ambition to ensure HI-Planet's success.`;

interface Props {
  isOpen: boolean;
  handleCloseModal: () => void;
}
const TeamModal: FC<Props> = ({ isOpen, handleCloseModal }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onClickClose = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) return;
    handleCloseModal();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <Overlay isOpen={isOpen} onClick={onClickClose}>
      <Window ref={ref}>
        <Header>
          <span>Ryan</span>
        </Header>
        <Body>{text}</Body>
      </Window>
    </Overlay>
  );
};

export default TeamModal;

const Header = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
`;
const Body = styled.div``;

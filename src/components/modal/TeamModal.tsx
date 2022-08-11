import React, { FC, ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { onClickWebsite } from "../../utils/common";
import { Overlay, Window } from "../common/styles/modal";
import LinkedIn from "../Icons/LinkedIn";

interface Props {
  isOpen: boolean;
  handleCloseModal: () => void;
  name: string;
  desc: ReactNode;
  linkedin: string;
}
const TeamModal: FC<Props> = ({
  isOpen,
  handleCloseModal,
  name,
  desc,
  linkedin,
}) => {
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
    <Overlay
      isOpen={isOpen}
      onTap={onClickClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Window
        ref={ref}
        initial={{ transform: "translateY(100%)" }}
        animate={{ transform: "translateY(0%)" }}
        exit={{ transform: "translateY(200%)" }}
      >
        <Header>
          <span>{name}</span>
        </Header>
        <Body>
          {desc}
          {linkedin.length !== 0 && (
            <IconContainer>
              <Icon onClick={() => onClickWebsite(linkedin)}>
                <LinkedIn />
              </Icon>
            </IconContainer>
          )}
        </Body>
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

const IconContainer = styled.div`
  display: flex;
`;

const Icon = styled.div`
  cursor: pointer;
  svg {
    fill: #0a66c2;
  }
`;

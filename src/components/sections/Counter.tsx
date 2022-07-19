import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { MINTING_DATE } from "../../constants";
// import { MINTING_DATE } from "../../constants/address";
import { ITime } from "../../interfaces/counter";
import { diffDay } from "../../utils/common";
import { ConnectButton } from "../common/styles/buttons";

interface TimeItemProps {
  time: number;
  indicator: string;
}

interface InfoItemProps {
  title: string;
  description: string;
}
const TimeItem = (props: TimeItemProps) => {
  return (
    <TimeItemContainer>
      <div>{props.time}</div>
      <span>{props.indicator}</span>
    </TimeItemContainer>
  );
};

const InfoItem = (props: InfoItemProps) => {
  return (
    <InfoItemContainer>
      <span className="item1">{props.title}: </span>
      <span className="item2">{props.description}</span>
    </InfoItemContainer>
  );
};

const Counter = () => {
  const [time, setTime] = useState<ITime | null>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      const _time = diffDay(MINTING_DATE);
      setTime(_time);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);
  return (
    <Section>
      <Container>
        <ModalWindow>
          <Title>
            Wait for it! HI PLANET NFT will be <br /> available for minting in:{" "}
          </Title>
          <TimeContainer>
            <TimeItem time={time?.day ?? 0} indicator="days" />
            <TimeItem time={time?.hour ?? 0} indicator="hours" />
            <TimeItem time={time?.min ?? 0} indicator="minutes" />
            <TimeItem time={time?.sec ?? 0} indicator="seconds" />
          </TimeContainer>
          <InfoContainer>
            <InfoItem title="price" description="$200 USD" />
            <InfoItem title="total supply" description="3,333" />
            <InfoItem title="mint date" description="SAT, Aug 27th - 2pm PST" />
          </InfoContainer>
          <Link to="/mint">
            <ConnectButton>Mint</ConnectButton>
          </Link>
        </ModalWindow>
      </Container>
    </Section>
  );
};

export default Counter;

const Section = styled.section`
  min-height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1130px;
  background: #151328;
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 70em) {
    width: 85%;
  }

  @media (max-width: 64em) {
    width: 100%;
    flex-direction: column;

    & > *:last-child {
      width: 80%;
    }
  }
  @media (max-width: 40em) {
    & > *:last-child {
      width: 90%;
    }
  }
`;
const ModalWindow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
`;

const Title = styled.h1`
  text-align: center;
`;
const TimeContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 3rem 0;
  > :last-child div {
    /* color: red !important; */
    ::before {
      display: none;
    }
  }
`;
const InfoContainer = styled.div`
  display: flex;
  gap: 2rem;
  .item1 {
    text-transform: capitalize;
    padding-right: 0.1rem;
    color: ${({ theme }) => theme.gray2};
  }
  padding-bottom: 2rem;
`;

const TimeItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > span {
    text-transform: capitalize;
    padding-top: 1rem;
  }
  > div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.font2xl};
    font-family: "Saira-Black";
    /* border: 1px solid ${({ theme }) => theme.primary}; */
    /* border: 1px solid ${({ theme }) => theme.selection}; */
    border: 2px solid #0faa9d;

    padding: 1.245rem 0.4rem;
    width: 5rem;
    border-radius: 0.5rem;
    ::before {
      content: ":";
      /* width:100%; */
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      position: absolute;
      left: 100%;
      transform: translateX(50%);
    }
  }
`;

const InfoItemContainer = styled.div``;

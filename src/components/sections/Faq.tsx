import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import styled from "styled-components";
import Accordion from "../Accordion";
// import AccordionDemo from "../AccordionDemo";

const Section = styled.section`
  /* min-height: 100vh; */
  height: auto;
  width: 100vw;
  padding: 4rem 0;
  /* background-color: ${(props) => props.theme.text}; */
  position: relative;
  color: ${(props) => props.theme.body};
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
  font-family: "Saira-Black";

  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.carouselColor};
  width: fit-content;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  width: 75%;
  margin: 2rem auto;

  display: flex;
  justify-content: space-between;
  align-content: center;

  @media (max-width: 64em) {
    width: 80%;
  }
  @media (max-width: 48em) {
    width: 90%;
    flex-direction: column;

    & > *:last-child {
      & > *:first-child {
        margin-top: 0;
      }
    }
  }
`;
const Box = styled.div`
  width: 45%;
  @media (max-width: 64em) {
    width: 90%;
    align-self: center;
  }
`;

const Faq = () => {
  return (
    <Section id="faq">
      <Title>Faq</Title>

      <Container>
        <Box>
          <Accordion
            ScrollTrigger={ScrollTrigger}
            title="When is the mint date ?"
          >
            We are targeting to launch in August. The exact date is yet to be
            determined though; it will be announced in advance.
          </Accordion>
          <Accordion
            ScrollTrigger={ScrollTrigger}
            title="What is our Total Supply and price ?"
          >
            Total supply is 3,333 NFTs and the price will be announced in
            advance.
          </Accordion>
        </Box>
        <Box>
          <Accordion
            ScrollTrigger={ScrollTrigger}
            title="How will I get the reward and How often ?"
          >
            We will take a snapshot with the Token ID-based holder's wallet
            address and the reward will be airdropped automatically through our
            system. Payout frequency will be decided by community(Either every
            quarter or 6months). We will have a vote once we are done minting.
          </Accordion>
          <Accordion
            ScrollTrigger={ScrollTrigger}
            title="How do I get the Welcome Package ?"
          >
            We will give you the promotion code and you will be able to check
            out your order on Official website of High Minded Intelligence.
            Entire process will be free including the shipping fee(worldwide
            international shipping).
          </Accordion>
        </Box>
      </Container>
    </Section>
  );
};

export default Faq;

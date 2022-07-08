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
            title="How much reward do I get and through what method?"
          >
            Our Evangelist will get 20% of entire sales profit. We will take a
            snapshot of holder’s wallet address and air drop the reward to your
            wallet directly every quarter
          </Accordion>
          <Accordion
            ScrollTrigger={ScrollTrigger}
            title="What is the mint date"
          >
            TBD
          </Accordion>
        </Box>
        <Box>
          <Accordion
            ScrollTrigger={ScrollTrigger}
            title="What kind of game model are we going to have?"
          >
            We are designing game model at this moment and we will specify it
            going through the discussions with our Evangelists. All of our OG
            evangelists will get the benefit of 1:1 free airdrop for every
            single each phase of new NFT projects.
          </Accordion>
          <Accordion
            ScrollTrigger={ScrollTrigger}
            title="How can I see the reward ?"
          >
            We will share the community’s wallet address and our business
            operation transparently. We also provide our own customized reward
            API system for your convenience. Easily go to “Reward” and check
            your estimated or current reward stats.
          </Accordion>
        </Box>
      </Container>
    </Section>
  );
};

export default Faq;

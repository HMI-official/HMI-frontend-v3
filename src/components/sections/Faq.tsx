import styled from "styled-components";
import Accordion from "../Accordion";
// import AccordionDemo from "../AccordionDemo";

const Section = styled.section`
  /* min-height: 100vh; */
  font-family: "Saira" !important;
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
  /* border-bottom: 2px solid ${(props) => props.theme.carouselColor}; */
  width: fit-content;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  /* width: 75%; */
  width: 100%;

  max-width: 1130px;

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
          <Accordion title="When is the mint date ?">
            Our Public mint date is 9/8/2022 2pm PST. WL and OG mint will be
            announced soon.
          </Accordion>
          <Accordion title="What is our Total Supply and price ?">
            3,333 NFTs. Total of 11 Planets will have 303 each army behind
            <br />
            OG : Free mint
            <br />
            WL Price : 0.09ETH
            <br />
            Public Sales : 0.12ETH
          </Accordion>
          {/* Public Sales : $200 USD */}
          {/* WL Price : $150 USD */}
          {/* WL(0.09ETH), Public(0.12ETH)  */}
        </Box>
        <Box>
          <Accordion title="How will I get the reward and How often ?">
            We will take a snapshot with the Token ID-based holder's wallet
            address and the reward will be airdropped automatically through our
            system. Payout frequency will be decided by community(Either every
            quarter or 6months). We will have a vote once we are done minting.
          </Accordion>
          <Accordion title="How do I get the Welcome Package ?">
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

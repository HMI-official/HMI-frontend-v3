import styled from "styled-components";

const RewardChart = () => {
  return (
    <Section>
      <Container>
        <Title> POTENTIAL REWARD</Title>
        <Image src="images/hmi-reward-chart-tp-v3.png" />
        <Image src="images/hmi-reward-chart-tp-bottom.png" />
      </Container>
    </Section>
  );
};

export default RewardChart;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 0;
`;

const Container = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  /* width: 100%; */
  /* width: 1300px; */
  /* max-width: 80%; */
  width: 100%;
  object-fit: contain;
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.primary};
  /* align-self: center; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
  font-family: "Saira-Black", sans-serif;
  @media (max-width: 64em) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;

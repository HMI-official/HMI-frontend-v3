import styled from "styled-components";

const RewardChart = () => {
  return (
    <Section>
      <Image src="images/hmi-reward-chart-black.png" />
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
const Image = styled.img`
  /* width: 100%; */
  max-width: 1000px;
  object-fit: contain;
`;

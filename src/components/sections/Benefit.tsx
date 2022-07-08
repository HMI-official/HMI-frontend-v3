import { ReactNode } from "react";
import styled from "styled-components";

const benefitData = [
  {
    title: "Passive income",
    content:
      '50% of sales profit from the "high minded intelligence" which is our streetwear fashion brand will be consistently distributed to all HI-Planet holders',
  },
  {
    title: "Welcome Package",
    content:
      "All community members of the Hi-planet NFT will have access to merch giveaways from the company as a welcome package to the Hi-planet community.",
  },
  {
    title: "Metaverse Hangout",
    content:
      "Holders of the Hi-planet NFT will have exclusive access to metaverse communities where there will be events, networking and contests.",
  },
  {
    title: "Hi-contests",
    content:
      "Holders can suggest merchandise collaboration ideas and we will sell it for winner and share 50% profit to them and the rest will go to the community.",
  },
  {
    title: "Early game access",
    content:
      "All holders will be given early access to the metaverse play to earn a game which is in development.",
  },
];
const benefitConfig = {
  gap: "6rem",
};

interface ItemProps {
  title: string;
  children: ReactNode;
}
const Item = ({ title, children }: ItemProps) => {
  return (
    <ItemContainer>
      <Icon>
        <img src="/images/crown.png" alt="crown" />
      </Icon>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </ItemContainer>
  );
};

const Benefit = () => {
  // const Item =
  return (
    <Section>
      <SectionWrapper>
        <MainTitle>benefits</MainTitle>
        <Grid>
          {/* <Row> */}
          <Item title={benefitData[0].title}>{benefitData[0].content}</Item>
          <Item title={benefitData[1].title}>{benefitData[1].content}</Item>
          <Item title={benefitData[2].title}>{benefitData[2].content}</Item>
          {/* </Row> */}
          {/* <Row> */}
          <Item title={benefitData[3].title}>{benefitData[3].content}</Item>
          <Item title={benefitData[4].title}>{benefitData[4].content}</Item>
          {/* </Row> */}
        </Grid>
      </SectionWrapper>
    </Section>
  );
};

export default Benefit;
const MainTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Saira-Black";
  color: ${(props) => props.theme.primary};
  font-size: ${(props) => props.theme.font2xl};
  text-transform: uppercase;
`;
const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: calc(${benefitConfig.gap});
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  /* max-width: 300px; */
  /* width: 300px; */
`;

const Icon = styled.div`
  display: flex;
  /* justify-content: flex-start; */
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    object-fit: contain;
  }
`;

const Title = styled.div`
  font-size: calc(${(props) => props.theme.fontxl} - 5px);
  font-family: "Saira-Black";
  display: flex;
  justify-content: center;
  text-transform: uppercase;

  // text break
  /* justify-content: flex-start; */

  align-items: center;
  padding-top: 1rem;
  padding-bottom: 2 rem;
`;
const Content = styled.div`
  font-size: ${(props) => props.theme.fontlg};
`;

const Section = styled.section`
  min-height: 30vh;
  padding: 14rem 0;
  /* padding-top:7rem */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  width: 100%;
  max-width: 1130px;
  gap: ${benefitConfig.gap};
  /* gap: calc(${benefitConfig.gap} * 2); */

  /* padding-left: 10rem; */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-gap: calc(${benefitConfig.gap});
  width: 100%;
  align-items: center;
  justify-content: center;
  /* max-width: 1130px; */
`;

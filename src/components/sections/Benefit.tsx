import { ReactNode } from "react";
import styled from "styled-components";
import { media } from "../../styles/Themes";
import { motion, Variants } from "framer-motion";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
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
    title: "Degen Planet",
    content:
      "There will be incentives for early minters of the Hi Planet Collection, Such as automatic OG or WL to Degen Planet. For more details about Degen planet, please check our Discord",
  },
  {
    title: "Metaverse Hangout",
    content:
      'HI-Planet studio will be constructed in metaverse such as "The Sandbox" or "Decentraland"',
  },
  {
    title: "Hi-contests",
    content:
      "Holders can suggest merchandise collaboration ideas and we will sell it for winner and share 50% profit to them and the rest will go to the community.",
  },
  {
    title: "Early game access",
    content:
      "Our end goal is creating P&E game in Metaverse. Planet holders will get early access with exclusive benefits.",
  },
];
const benefitConfig = {
  gap: "6rem",
};

interface ItemProps {
  title: string;
  children: ReactNode;
  duration: number;
}
const Item = ({ title, children, duration }: ItemProps) => {
  return (
    <ItemContainer
      variants={titleVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.1 }}
    >
      <Icon>
        <img src="/images/crown.png" alt="crown" />
      </Icon>
      <Title
        variants={titleVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        {title}
      </Title>
      <ContentContainer>
        <Content
          variants={contentVariants(duration)}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          {children}
        </Content>
      </ContentContainer>
    </ItemContainer>
  );
};

const titleVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

const contentVariants = (dur: number): Variants => {
  return {
    offscreen: {
      x: -50,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: dur,
      },
    },
  };
};
const durations = [0.1, 0.4, 0.7, 0.1, 0.4, 0.7];

const Benefit = () => {
  const { width, height } = useWindowDimensions();
  console.log(width, height);
  // const Item =
  return (
    <Section>
      <SectionWrapper>
        <MainTitle
          variants={titleVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.06 }}
        >
          benefits
        </MainTitle>
        <Grid>
          {/* <Row> */}
          {benefitData.map((item, index) => (
            <Item
              key={index}
              title={item.title}
              duration={width > 768 ? durations[index] * 2 : 0.8}
            >
              {item.content}
            </Item>
          ))}
        </Grid>
      </SectionWrapper>
    </Section>
  );
};

export default Benefit;
const MainTitle = styled(motion.h2)`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Saira-Black";
  color: ${(props) => props.theme.primary};
  font-size: ${(props) => props.theme.font2xl};
  text-transform: uppercase;
  ${media[768]} {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const ItemContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  ${media.mobile} {
    justify-content: center;
    align-items: center;
  }
`;

const Icon = styled(motion.div)`
  display: flex;
  /* justify-content: flex-start; */
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    object-fit: contain;
    ${media.mobile} {
      width: 70px;
    }
  }
`;

const Title = styled(motion.div)`
  font-size: calc(${(props) => props.theme.fontxl} - 5px);
  font-family: "Saira-Black";
  display: flex;
  justify-content: center;
  text-transform: uppercase;

  // text break
  /* justify-content: flex-start; */

  align-items: center;
  padding-top: 1rem;
  padding-bottom: 2rem;
  ${media.mobile} {
    font-size: ${(props) => props.theme.fontlg};
    padding-bottom: 0.5rem;
  }
`;

const ContentContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled(motion.div)`
  font-size: ${(props) => props.theme.fontlg};
  ${media.mobile} {
    font-size: ${(props) => props.theme.fontmd};
    max-width: 80%;
    line-height: 1.5;
  }
`;

const Section = styled.section`
  min-height: 30vh;
  padding: 14rem 0;
  /* padding-top:7rem */
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile} {
    padding: 5rem 0;
  }
`;
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  width: 100%;
  max-width: 1130px;
  gap: ${benefitConfig.gap};
  ${media.mobile} {
    gap: calc(${benefitConfig.gap} / 2);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-gap: calc(${benefitConfig.gap});
  width: 100%;
  align-items: center;
  justify-content: center;
  ${media["1200"]} {
    grid-template-columns: repeat(2, 300px);
  }
  ${media["768"]} {
    grid-template-columns: repeat(1, 300px);
  }
  ${media.mobile} {
    grid-gap: calc(${benefitConfig.gap} / 1.5);
  }
  /* max-width: 1130px; */
`;

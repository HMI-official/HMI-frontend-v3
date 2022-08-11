import { ReactNode, Suspense, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { HMI_HERO, TEAM_IMAGES } from "../../constants/image";
import { media } from "../../styles/Themes";
import Loading from "../Loading";
import TeamModal from "../modal/TeamModal";
import {
  IModalMemberInfo,
  modalMemberInfoInit,
} from "../../interfaces/section";
import { titleVariants } from "../common/styles/framer-motion";

const teamConfig = {
  gap: "3rem",
};

interface IMember {
  name: string;
  planet: string;
  role: string;
  img: string;
  anime: string;
  delay: number;
  offset: number;
  desc: ReactNode;
  linkedin: string;
}
interface ItemProps extends IMember {
  onClickMember: () => void;
}

const teamData: IMember[] = [
  {
    name: "Sean",
    img: TEAM_IMAGES.sean,
    planet: "FOUNDER",
    role: "The Creator Of HI-Planet",
    anime: "flip-left",
    delay: 0,
    offset: 0,
    desc: (
      <span>
        With over 20 years of experience, Sean has been engaged into sales and
        marketing, specializing in the sport and fashion apparel industry.{" "}
        <br />
        <br />
        This vast experience and demonstrated history of working in the fashion
        industry has made him a great leader.
        <br /> <br /> As a founder of HI-Planet NFT, Sean works with the team to
        lead the way in trend forecasting, business development and
        partnerships.
        <br />
        <br /> He brings with him AO Apparel, the manufacturing company under
        Sean's control, as our main key to success for profit sharing model.
      </span>
    ),
    linkedin: "",
  },
  {
    name: "Ryan",
    img: TEAM_IMAGES.ryan,
    planet: "CO-FOUNDER",
    role: "Peacemaker",
    anime: "flip-left",
    delay: 150,
    offset: 0,
    desc: (
      <span>
        Ryan is an owner of a crypto mining business; he has handled more than
        200+ mining systems and is currently managing a datacenter.
        <br />
        <br />
        Additionally, he has been servicing over 50 customers.
        <br />
        <br /> He knows how value and real utility is important when it comes to
        an NFT; he is confident to display the HI-Planet NFT project to the
        world. <br />
        <br />
        As a co-founder of HPN, Ryan takes on the role to lead the project in a
        realistic way with the ambition to ensure HI-Planet's success.
        <br />
        <br />
      </span>
    ),
    linkedin: `https://www.linkedin.com/in/ryan-lee-594b441b6/`,
  },
  {
    name: "NICK",
    img: TEAM_IMAGES.nick,
    planet: "PROJECT MANAGER",
    role: "Tech-savvy",
    anime: "flip-left",
    delay: 300,
    offset: 0,
    desc: (
      <span>
        Nick is a design engineer for General Motors with a Master's in
        Engineering Management and a Bachelors of Science in Mechanical
        Engineering.
        <br />
        <br /> With a very detailed oriented mind he can help to ensure a smooth
        operating project with many interesting twists and turns for the
        Planeteers.
        <br />
        <br /> With 6 months of NFT experience he has minted 14 projects in that
        time.
        <br />
        <br /> These various projects have given him expansive knowledge in
        valuable utilities for NFT holders. <br />
        <br />
      </span>
    ),
    linkedin: `https://www.linkedin.com/in/nicholas-m-rowe/`,
  },
  {
    name: "CASEY", // 여기가 NICK
    img: TEAM_IMAGES.casey,
    planet: "COMMUNITY MANAGER",
    role: "COMMUNITY MANAGER",
    anime: "flip-left",
    delay: 450,
    offset: 0,
    desc: (
      <span>
        Casey Gordon lives in Southwest Florida and has been working in the
        restaurant industry for the past 20 years.
        <br />
        <br /> He has been investing in cryptocurrency for about 8 years now.
        <br />
        <br /> The whole NFT world fascinates him and he could easily spend
        hours researching/developing ideas/shilling NFT projects.
        <br />
        <br /> He is a moderator in multiple projects both ETH and SOL. And now
        the community manager for Hi Planet!
        <br />
        <br />
      </span>
    ),
    linkedin: "https://www.linkedin.com/in/casey-gordon-037419a/",
  },
  {
    name: "TONY",
    img: TEAM_IMAGES.tony,
    planet: "ADVISER(MARKETING)",
    role: "Motor-Mouth",
    anime: "flip-left",
    delay: 600,
    offset: 0,
    desc: (
      <span>
        Tony has over 20 years of Marketing & Branding experience. He has worked
        with major brands like Target, Apple, Ford, and Universal.
        <br />
        <br /> He has pioneered startups and mid-level companies to heighten
        branding and profitability.
        <br />
        <br /> He has been a leading force in media as well with significant
        celebrity relationships, procuring partnerships with companies Jack
        Daniels, Converse, Nike, PAC-SUN, and Forever21.
        <br />
        <br />
        His vast network and vision have created growth in companies over the
        last five years of a multiple of 10x. <br />
        <br />
        Tony is a leading technologist and entrepreneur. He is currently the
        Co-Founder & CEO of Crowds by Crowdstarter and the Wolphbrain Group.
        <br />
        <br />
      </span>
    ),
    linkedin: "https://www.linkedin.com/in/tony-harvey-12880324/",
  },
  {
    name: "JENNY",
    img: TEAM_IMAGES.jenny,
    planet: "DESIGN & ARTIST",
    role: "Avant-Garde",
    anime: "flip-left",
    delay: 750,
    offset: 0,
    desc: (
      <span>
        Jenny has been working for over 20 years as a fashion designer with her
        entire career stemming from Los Angeles, California. <br />
        <br />
        Through all of the glamour of LA, she has found the time and inspiration
        to create our NFT characters, bringing Hi Planet to life. <br />
        <br />
        She has accumulated vast experiences which range from starting,
        establishing, and developing a brand to production line management.
        <br />
        <br />
      </span>
    ),
    linkedin: "https://www.linkedin.com/in/jennykim1977/",
  },
];

const Item = (props: ItemProps) => {
  return (
    <ItemContainer
      data-aos={props.anime}
      data-aos-delay={props.delay}
      data-aos-offset={props.offset}
    >
      <ImgContainer onClick={props.onClickMember}>
        <Suspense fallback={<Loading />}>
          <img src={props.img} alt="The HMI" loading="lazy" />
        </Suspense>
      </ImgContainer>
      <ItemTextContainer>
        <Name>{props.name}</Name>
        <Planet>{props.planet}</Planet>
        {/* <Role>{props.role}</Role> */}
      </ItemTextContainer>
    </ItemContainer>
  );
};

const TeamV2 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] =
    useState<IModalMemberInfo>(modalMemberInfoInit);

  const onClickMember = (member: IMember) => {
    const { name, desc, linkedin } = member;
    setIsOpen(true);
    setMemberInfo({ name, desc, linkedin });
  };
  const handleCloseModal = () => setIsOpen(false);

  const TopItemComponent = teamData
    .slice(0, 3)
    .map((member) => (
      <Item
        key={member.name}
        {...member}
        onClickMember={() => onClickMember(member)}
      />
    ));

  const BottomItemComponent = teamData
    .slice(3, 6)
    .map((member) => (
      <Item
        key={member.name}
        {...member}
        onClickMember={() => onClickMember(member)}
      />
    ));
  return (
    <Section id="team">
      <Container>
        <MainTitle
          variants={titleVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0.06 }}
        >
          Team
        </MainTitle>
        <Grid>
          {TopItemComponent}
          {BottomItemComponent}
        </Grid>
      </Container>
      <AnimatePresence>
        {isOpen && (
          <TeamModal
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            {...memberInfo}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default TeamV2;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* flex: 1; */
`;
const ItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  gap: 0.2rem;
`;
const Name = styled.span`
  font-family: "Saira-Black";
  text-transform: uppercase;
  font-size: calc(${(props) => props.theme.fontlg} + 0.5rem);
  ${media.mobile} {
    font-size: ${(props) => props.theme.fontlg};
  }
`;
const Planet = styled.span``;
const Role = styled.span``;
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
const Row = styled.div`
  display: flex;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  align-items: center;
  justify-content: center;
  gap: ${teamConfig.gap};
`;

const Section = styled.section`
  min-height: 30vh;
  /* padding: 14rem 0; */
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.mobile} {
    padding-top: 10rem;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  width: 100%;
  max-width: 1130px;
  gap: calc(${teamConfig.gap});

  /* padding-left: 10rem; */
`;

const ImgContainer = styled.div`
  /* width: 20rem; */
  /* height: 20rem; */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;

  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.5);
  :hover {
    border-color: ${({ theme }) => theme.primary};
    /* border-color: #00ffeaa3; */
  }
  transition: all 0.3s ease-in-out;

  ${media.mobile} {
    /* width: 15rem; */
    /* height: 15rem; */
  }

  img {
    width: 16rem;
    height: 16rem;
    min-height: 16rem;
    object-fit: cover;

    @media (max-width: 48em) {
      width: 12rem;
      height: 12rem;
      min-height: 12rem;
    }
    @media (max-width: 30em) {
      width: 10rem;
      height: 10rem;
      min-height: 10rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: calc(${teamConfig.gap});
  width: 100%;
  align-items: center;
  justify-content: center;
  ${media["1200"]} {
    grid-template-columns: repeat(2, 300px);
  }
  ${media["768"]} {
    grid-template-columns: repeat(1, 300px);
  }
  /* max-width: 1130px; */
`;

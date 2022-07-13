import styled from "styled-components";
import { ETC_IMAGES } from "../../constants/image";

const FooterV2 = () => {
  return (
    <Section>
      <Wrapper>
        <div className="item1">
          <img src={ETC_IMAGES.logo} alt="logo" />
        </div>
        <div className="item2">© 2022 Hi-Planet. All rights reserved.</div>
      </Wrapper>
    </Section>
  );
};

export default FooterV2;

const Section = styled.section`
  padding-top: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontlg};
  .item1 {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 2rem;
  }
  .item2 {
    color: ${({ theme }) => theme.gray2};
    /* padding-bottom: 1rem; */
  }
  img {
    width: 100px;
  }
`;

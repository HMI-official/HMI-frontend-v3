import { FC } from "react";
import styled from "styled-components";

interface Props {
  title: string;
  content: string;
  desc?: string;
}
const RewardItemComponent: FC<Props> = ({ title, content, desc }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
      {desc && <Desc>{desc}</Desc>}
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.div`
  font-size: 1.3rem;
  padding-bottom: 0.4rem;
  color: ${(props) => props.theme.colors.gray300};
  font-weight: 200;
`;
const Content = styled.div`
  font-size: 1.7rem;
`;
const Desc = styled.span`
  color: ${(props) => props.theme.colors.gray400};
  font-size: 0.9rem;
`;

export default RewardItemComponent;

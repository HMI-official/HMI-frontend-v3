import { Link } from "react-router-dom";
import styled from "styled-components";
import { deployContract } from "../utils/deployContract";
const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;

  mark {
    background: var(--color-accent);
    color: var(--color-text);
    font-weight: bold;
    padding: 0 0.2em;
  }

  .card {
    display: flex;
    flex-direction: column;
    background: var(--color-background);
    padding: calc(4 * var(--size-bezel));
    /* padding-top: 0.4rem; */
    margin-top: calc(4 * var(--size-bezel));

    border-radius: var(--size-radius);
    border: 3px solid var(--color-shadow, currentColor);
    box-shadow: 0.5rem 0.5rem 0 var(--color-shadow, currentColor);

    &--accent {
      --color-background: var(--color-signal);
      --color-accent: var(--color-light);
      color: var(--color-dark);
    }

    *:first-child {
      margin-top: 0;
    }
  }

  .l-design-widht {
    max-width: 40rem;
    padding: 1rem;
  }

  .button-group {
    margin-top: calc(var(--size-bezel) * 2.5);
    button {
      cursor: pointer;
    }
  }

  button {
    color: currentColor;
    padding: var(--size-bezel) calc(var(--size-bezel) * 2);
    background: var(--color-accent);
    border: none;
    border-radius: var(--size-radius);
    font-weight: 900;

    &[type="reset"] {
      background: var(--color-background);
      font-weight: 200;
    }
  }

  button + button {
    margin-left: calc(var(--size-bezel) * 2);
  }

  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
  }

  .hidden {
    display: none;
  }
`;

const Box = styled.div``;
const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const Title = styled.h2`
  /* padding: 1rem; */
`;
const Content = styled.div``;
const AdminDashboard = () => {
  const onClickDeploy = () => deployContract();

  return (
    <Section>
      <Title>Admin Dashboard</Title>
      <Content>
        <Box>
          <div className="card card--accent">
            <SubTitle>deploy your smart contract</SubTitle>
            <div className="button-group">
              <button onClick={onClickDeploy}>Deploy</button>
              <Link to="/">
                <button type="reset">back</button>
              </Link>
            </div>
          </div>
        </Box>
      </Content>
    </Section>
  );
};

export default AdminDashboard;

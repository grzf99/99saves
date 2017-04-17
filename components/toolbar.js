import styled from 'styled-components';
import { colors } from './styles/variables';
import Button from './common/button';
import Container from './common/container';
import Link from 'next/link';

const Toolbar = styled.header`
  background: ${colors.black};
  width: 100%;
`;

const CustomContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

const Logo = styled.img`
  margin-left: 5px;
`;

const MenuLinks = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-width: 220px;
`;

const LinkAllSaves = styled.a`
  background-color: transparent;
  color: ${colors.white};
  cursor: pointer;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;

  &:link {
    color: ${colors.white};
    transition: .2s ease background-color;
  }

  &:hover {
    color: ${colors.alternateGreen};
  }`;

export default props => (
  <Toolbar>
    <CustomContainer>
      <Logo src="/static/images/logo-99-saves.svg" alt="99saves" />

      <MenuLinks>
        <LinkAllSaves href="/saves">
          todos os saves
        </LinkAllSaves>
        {
          !props.logged && <Button small outline onClick={props.login}>login</Button>
        }
      </MenuLinks>
    </CustomContainer>
  </Toolbar>
);

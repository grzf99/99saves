import styled from 'styled-components';
import Link from 'next/link';
import { colors } from './styles/variables';
import Button from './common/button';
import Container from './common/container';
import Link from 'next/link';

const Toolbar = styled.header`
  background: ${colors.black};
  width: 100%;

  &.transparent {
    background: transparent;
  }
`;

const CustomContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 12px;
`;

const LinkLogo = styled.a`
  display: inline-block;
  cursor: pointer;`;

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
  }
`;

export default props => (
  <Toolbar className={props.background} >
    <CustomContainer>
      <Link prefetch href="/">
        <LinkLogo>
          <Logo src="/static/images/logo-99-saves.svg" alt="99saves" />
        </LinkLogo>
      </Link>

      <MenuLinks> 
        <Link prefetch href="/saves">
          <LinkAllSaves>
            todos os saves
          </LinkAllSaves>
        </Link>
        {
          !props.logged && <Button small outline onClick={props.login}>login</Button>
        }
      </MenuLinks>
    </CustomContainer>
  </Toolbar>
);

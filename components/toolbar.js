import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from './styles/variables';
import Button from './common/button';
import Container from './common/container';
import LoginModal from './auth/login-modal';

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

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logged) {
      this.toggleModal();
    }
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    return (
      <Toolbar className={this.props.background} >
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
              !this.props.logged && <Button small outline onClick={() => this.toggleModal()}>login</Button>
            }
          </MenuLinks>
        </CustomContainer>

        <LoginModal isOpen={this.state.modalOpen} close={() => this.toggleModal()} />
      </Toolbar>
    );
  }
}

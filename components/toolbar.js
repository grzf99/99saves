import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from './styles/variables';
import RenderIf from './common/render-if';
import Button from './common/button';
import Container from './common/container';
import LoginModal from './auth/login-modal';
import { connect } from 'react-redux';

const Toolbar = styled.header`
  background: ${colors.black};
  width: 100%;

  &.transparent {
    background: transparent;
  }
`;

const CustomContainer = styled(Container) `
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

const LoggedIn = styled.span`
  background-color: transparent;
  color: ${colors.white};
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  margin-left: 30px;
  text-transform: uppercase;
`;

class Toolbars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logged && nextProps.logged !== this.props.logged) {
      this.toggleModal();
    }
  }

  toggleModal() {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  }

  render() {
    return (
      <Toolbar className={this.props.background}>
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
            <RenderIf expr={!this.props.logged}>
              <Button small outline onClick={this.toggleModal}>
                login
              </Button>
            </RenderIf>
            <RenderIf expr={this.props.logged}>
              <Button small outline onClick={this.props.onLogout}>
                sair
              </Button>
            </RenderIf>
          </MenuLinks>
        </CustomContainer>

        <LoginModal isOpen={this.state.modalOpen} close={this.toggleModal} />
      </Toolbar>
    );
  }
}

export default connect(
  (state) => ({
    current_user: state.currentUser
  }))(Toolbars)
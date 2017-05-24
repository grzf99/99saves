import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { colors } from './styles/variables';
import RenderIf from './common/render-if';
import Button from './common/button';
import Container from './common/container';
import LoginModal from './auth/login-modal';
import ForgotPasswordModal from './auth/forgot-password-modal';

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

  @media (max-width: 480px) {
    min-width: 175px;
  }
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

class Toolbars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalOpen: false,
      forgotPasswordModalIsOpen: false
    };
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.openForgotPasswordModal = this.openForgotPasswordModal.bind(this);
    this.closeForgotPasswordModal = this.closeForgotPasswordModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logged && nextProps.logged !== this.props.logged) {
      this.closeLoginModal();
    }
  }

  openLoginModal() {
    this.setState({ loginModalOpen: true });
  }

  closeLoginModal() {
    this.setState({ loginModalOpen: false });
  }

  openForgotPasswordModal() {
    this.setState({ forgotPasswordModalIsOpen: true, loginModalOpen: false });
  }

  closeForgotPasswordModal() {
    this.setState({ forgotPasswordModalIsOpen: false });
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
              <Button small outline onClick={this.openLoginModal}>
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

        <LoginModal
          isOpen={this.state.loginModalOpen}
          onForgotPassword={this.openForgotPasswordModal}
          onClose={this.closeLoginModal}
        />

        <ForgotPasswordModal
          isOpen={this.state.forgotPasswordModalIsOpen}
          onClose={this.closeForgotPasswordModal}
          api={this.props.api}
        />
      </Toolbar>
    );
  }
}

export default Toolbars;

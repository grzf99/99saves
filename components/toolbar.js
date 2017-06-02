import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import withApi from '../components/hoc/withApi';
import { colors } from './styles/variables';
import RenderIf from './common/render-if';
import Button from './common/button';
import Input from './common/input';
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
  min-width: 200px;

  @media (max-width: 480px) {
    min-width: 175px;
  }
`;

const SearchInput = styled(Input)`
  background: transparent;
  border-radius: 5px;
  border: solid 1px ${colors.green};
  width: 200px;
  color: ${colors.white};
  padding: 3px 0 3px 5px;

  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: ${colors.white};
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: ${colors.white};
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: ${colors.white};
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: ${colors.white};
  }

  @media (max-width: 480px) {
    display: none;
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

  handleSearchChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.props.onSearch(this.state.q));
  }

  keyHandle = (e) => {
    if (e.key === 'Enter' || e.target.value === '') {
      this.props.onSearch(this.state.q)
    }
  };

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
            {this.props.onSearch &&
              <SearchInput
                name="q"
                type='search'
                placeholder="Busca"
                onKeyUp={this.keyHandle}
                onChange={this.handleSearchChange}
                value={this.state.q}
              />
            }
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

export default withApi()(Toolbars);

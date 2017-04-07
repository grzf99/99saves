import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import SwipeableViews from 'react-swipeable-views';
import 'isomorphic-fetch';

import config from '../config';
import { colors } from '../components/styles/variables';
import { Heading, Text } from '../components/common/typography';
import Button from '../components/common/button';
import Toolbar from '../components/toolbar';
import Card from '../components/card';
import Tabs from '../components/common/tabs';
import Tab from '../components/common/tab';

const ModalContent = styled.div`
  > * + * {
    margin-top: 25px !important;
  }
`;

const ModalHeading = styled(Heading)`
  margin: 16px 5px 0;
`;

const ModalText = styled(Text)`
  font-size: 14px;
`;

const FacebookButton = styled(Button)`
  background: url(/static/images/bt-facebook.svg) no-repeat 18px 12px ${colors.facebookBlue};
  font-size: 17px;
  font-weight: 400;
  padding-left: 40px;
  text-transform: inherit;
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  content: {
    top: '50%',
    left: '20px',
    right: '20px',
    bottom: 'auto',
    border: '0',
    transform: 'translateY(-50%)',
    borderRadius: '0'
  }
};

export default class extends React.Component {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${config.API_URL}/saves`);
    const saves = await res.json();
    return { saves };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      logged: false,
      modalIsOpen: false,
      activeTab: 0,
      saves: props.saves,
      subscriptions: {
        count: 0,
        rows: []
      },
      accessToken: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.reloadSaves = this.reloadSaves.bind(this);
  }

  handleLogin() {
    FB.login((res) => {
      // eslint-disable-next-line no-undef
      fetch(`${config.API_URL}/auth/facebook?access_token=${res.authResponse.accessToken}`)
        .then(user => user.json())
        .then(({ user }) => {
          this.setState({
            user,
            logged: true,
            modalIsOpen: false,
            accessToken: res.authResponse.accessToken
          });
          this.reloadSaves();
        });
    }, { scope: 'email' });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  reloadSaves() {
    // eslint-disable-next-line no-undef
    fetch(`${config.API_URL}/saves?access_token=${this.state.accessToken}`)
        .then(saves => saves.json())
        .then((saves) => {
          const subscriptions = saves.rows.filter(save => save.hasSubscribed);
          this.setState({
            saves,
            subscriptions: {
              count: subscriptions.length,
              rows: subscriptions
            }
          });
        });
  }

  render() {
    return (
      <div>
        <Toolbar login={this.handleLogin} logged={this.state.logged} />
        {
          this.state.logged && (
            <Tabs index={this.state.activeTab} onChange={this.handleChangeIndex}>
              <Tab>Todos</Tab>
              <Tab>Acompanhando</Tab>
            </Tabs>
          )
        }

        <SwipeableViews
          disabled={!this.state.logged}
          index={this.state.activeTab}
          onChangeIndex={this.handleChangeIndex}
        >
          <div>
            {
              this.state.saves.rows.map(
                save =>
                  <Card
                    {...save}
                    key={save.id}
                    logged={this.state.logged}
                    openLoginModal={this.openModal}
                  />
              )
            }
          </div>

          <div>
            {
              this.state.subscriptions.rows && this.state.subscriptions.rows.map(
                save =>
                  <Card
                    {...save}
                    key={save.id}
                    logged={this.state.logged}
                    openLoginModal={this.openModal}
                  />
              )
            }
          </div>
        </SwipeableViews>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Login modal"
          style={modalStyles}
        >
          <ModalContent>
            <ModalHeading uppercase large>Agora falta só o login ;)</ModalHeading>
            <ModalText>
              Entre com o Facebook e receba as atualizações das negociações desse produto.
            </ModalText>
            <FacebookButton block onClick={this.handleLogin}>Entrar com o Facebook</FacebookButton>
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

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
import Toast from '../components/common/toast';
import Container from '../components/common/container';

const Page = styled.div`
  background: ${colors.black};
  width: 100%;
`;

const CardsList = styled(Container)`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: calc(33.3% - 10px);
    margin: 36px 5px 0;
    max-width: calc(33.3% - 10px);

    &:nth-child(3n + 1) {
      margin-left: 0;
    }

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
`;

const BlankState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 100px);
  padding: 60px 30px;
  text-align: center;

  > h1 {
    margin: 0 20px;
  }
`;

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
      accessToken: '',
      subscribeTo: 0,
      showToast: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.reloadSaves = this.reloadSaves.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  componentDidMount() {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) this.authenticate(accessToken).then(this.reloadSaves);
  }

  loginWithFacebook() {
    return new Promise((resolve) => {
      FB.login((res) => {
        window.localStorage.setItem('accessToken', res.authResponse.accessToken);
        resolve(res);
      }, { scope: 'email' });
    });
  }

  authenticate(accessToken) {
    return fetch(`${config.API_URL}/auth/facebook?access_token=${accessToken}`)
      .then(user => user.json())
      .then(({ user }) => {
        this.setState({
          user,
          logged: true,
          modalIsOpen: false,
          subscribeTo: 0,
          accessToken
        });
      });
  }

  handleLogin(subscribeTo) {
    this.loginWithFacebook()
      .then(res => this.authenticate(res.authResponse.accessToken).then(subscribeTo
        ? this.handleSubscribe(subscribeTo, res.authResponse.accessToken)
        : Promise.resolve()
      ))
      .then(this.reloadSaves);
  }

  handleSubscribe(subscribeTo, accessToken) {
    return fetch(
      `${config.API_URL}/saves/${subscribeTo}/subscriptions?access_token=${accessToken || this.state.accessToken}`,
      { method: 'POST' }
    ).then(() => {
      const rows = [...this.state.saves.rows].map((row) => {
        const save = row;
        if (save.id === subscribeTo) save.hasSubscribed = true;
        return save;
      });
      this.setState({ saves: { count: rows.length, rows }, showToast: true });
      setTimeout(() => this.setState({ showToast: false }), 4000);
    });
  }

  openModal(subscribeTo) {
    this.setState({ modalIsOpen: true, subscribeTo });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  reloadSaves() {
    fetch(`${config.API_URL}/saves?access_token=${this.state.accessToken}`)
        .then(saves => saves.json())
        .then((saves) => {
          this.setState({
            saves
          });
        });
  }

  render() {
    return (
      <Page>
        <Toolbar login={() => this.handleLogin()} logged={this.state.logged} />
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
          animateHeight
        >
          <CardsList>
            {
              this.state.saves.rows && this.state.saves.rows.map(
                save =>
                  <Card
                    {...save}
                    key={save.id}
                    logged={this.state.logged}
                    openLoginModal={() => this.openModal(save.id)}
                    handleSubscribe={() => this.handleSubscribe(save.id)}
                  />
              )
            }
          </CardsList>

          <CardsList>
            {
              this.state.saves.rows
                ? this.state.saves.rows.filter(save => save.hasSubscribed).map(
                    save =>
                      <Card
                        {...save}
                        key={save.id}
                        logged={this.state.logged}
                        openLoginModal={() => this.openModal(save.id)}
                        handleSubscribe={() => this.handleSubscribe(save.id)}
                      />
                  )
                : (
                  <BlankState>
                    <Heading white>Ainda não tem nenhum save???</Heading>
                    <Text white>O que você está esperando? Escolha os produtos que te interessam e participe do grupo que conseguirá os melhores descontos do mercado!</Text>
                    <div>
                      <Button outline onClick={() => this.handleChangeIndex(0)}>Ver todos os saves</Button>
                    </div>
                  </BlankState>
                )
            }
          </CardsList>
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
            <FacebookButton block onClick={() => this.handleLogin(this.state.subscribeTo)}>Entrar com o Facebook</FacebookButton>
          </ModalContent>
        </Modal>

        <Toast show={this.state.showToast}>
          Você receberá um email com atualizações sobre esta negociação.
        </Toast>
      </Page>
    );
  }
}

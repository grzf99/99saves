import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import { lighten } from 'polished';
import Modal from 'react-modal';
import SwipeableViews from 'react-swipeable-views';

import config from '../config';
import { colors } from '../components/styles/variables';
import { Heading, Text } from '../components/common/typography';
import Button from '../components/common/button';
import Toolbar from '../components/toolbar';
import Card from '../components/card';
import Footer from '../components/footer';
import Page from '../components/common/page';
import Tabs from '../components/common/tabs';
import Tab from '../components/common/tab';
import Toast from '../components/common/toast';
import Container from '../components/common/container';
import Headline from '../components/common/headline';

const CardsList = styled(Container)`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-flow: row wrap;
`;

const StyledCard = styled(Card)`
  @media (min-width: 480px) {
    flex: 1;
    flex-basis: calc(50% - 10px);
    max-width: calc(50% - 10px);
    margin: 36px 5px 0;

    &:nth-child(3n + 1) {
      margin-left: 0;
    }

    &:nth-child(3n + 2) {
      margin-right: 0;
    }
  }

  @media (min-width: 960px) {
    flex-basis: calc(33.3% - 10px);
    max-width: calc(33.3% - 10px);

    &:nth-child(3n + 2) {
      margin-right: 5px;
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
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  padding: 60px 30px;
  text-align: center;
  max-width: 480px;

  @media (min-width: 640px) {
    padding: 150px 30px;
  }

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
  background-color: ${colors.facebookBlue};
  background-image: url(/static/images/bt-facebook.svg);
  background-position: 18px 12px;
  background-repeat: no-repeat;
  font-size: 17px;
  font-weight: 400;
  padding-left: 40px;
  text-transform: inherit;

  &:hover {
    background-color: ${lighten(0.1, colors.facebookBlue)};
  }
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
    borderRadius: '0',
    maxWidth: '480px',
    margin: '0 auto'
  }
};

const savesMapper = ({ count, rows }) => {
  return {
    count,
    rows: rows.map((item) => {
      const save = item;

      if (save.Subscriptions && save.Subscriptions.length > 0) {
        save.hasSubscribed = true;

        if (save.Subscriptions.some(s => s.Votes.length > 0)) {
          save.hasVoted = true;
        }
      }

      return save;
    })
  };
};

export default class extends React.Component {
  static async getInitialProps() {
    const items = await axios.get(`${config.API_URL}/saves?filters[active]=true`);
    const saves = savesMapper(items.data);
    return { saves };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      logged: false,
      modalIsOpen: false,
      activeTab: 1,
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
    this.loadSaves = this.loadSaves.bind(this);
    this.loadSubscriptions = this.loadSubscriptions.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  componentDidMount() {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      this.authenticate(accessToken)
        .then(() => Promise.all([
          this.loadSaves(),
          this.loadSubscriptions()
        ]));
    }
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
    return axios.get(`${config.API_URL}/auth/facebook?access_token=${accessToken}`)
      .then(res => res.data)
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
      .then(() => Promise.all([
        this.loadSaves(),
        this.loadSubscriptions()
      ]));
  }

  handleSubscribe(subscribeTo, accessToken) {
    return axios.post(`${config.API_URL}/saves/${subscribeTo}/subscriptions?access_token=${accessToken || this.state.accessToken}`)
    .then(() => {
      const item = this.state.saves.rows.find(save => save.id === subscribeTo);
      item.hasSubscribed = true;

      const subscriptionsRows = [...this.state.subscriptions.rows, item];

      this.setState({
        subscriptions: { count: subscriptionsRows.length, rows: subscriptionsRows },
        showToast: true
      });

      setTimeout(() => this.setState({ showToast: false }), 4000);
    });
  }

  goToOffers(slug) {
    Router.push(`/offer?saveId=${slug}`, `/offer/${slug}`);
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

  loadSaves() {
    return axios.get(`${config.API_URL}/saves?filters[active]=true&access_token=${this.state.accessToken}`)
      .then(res => res.data)
      .then(saves => savesMapper(saves))
      .then((saves) => {
        this.setState({ saves });
      });
  }

  loadSubscriptions() {
    return axios.get(`${config.API_URL}/saves?filters[subscribed]=true&access_token=${this.state.accessToken}`)
      .then(res => res.data)
      .then(saves => savesMapper(saves))
      .then((subscriptions) => {
        this.setState({ subscriptions });
      });
  }

  renderUserSaves() {
    return (
      this.state.subscriptions.rows
        ? this.state.subscriptions.rows.map(
            save =>
              <StyledCard
                {...save}
                key={save.id}
                logged={this.state.logged}
                openLoginModal={() => this.openModal(save.id)}
                handleSubscribe={() => this.handleSubscribe(save.id)}
                goToOffers={() => this.goToOffers(save.slug)}
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
    );
  }

  render() {
    return (
      <Page hasFooter>
        <Toolbar login={() => this.handleLogin()} logged={this.state.logged} />

        <Headline>
          Participe dos saves que você tem interesse e acompanhe toda a negociação até o melhor desconto.
        </Headline>

        {
          this.state.logged && (
            <Tabs withBorder index={this.state.activeTab} onChange={this.handleChangeIndex}>
              <Tab>Meus Saves</Tab>
              <Tab>Todos</Tab>
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
            { this.renderUserSaves() }
          </CardsList>

          <CardsList>
            {
              this.state.saves.rows && this.state.saves.rows.map(
                save =>
                  <StyledCard
                    {...save}
                    key={save.id}
                    logged={this.state.logged}
                    openLoginModal={() => this.openModal(save.id)}
                    handleSubscribe={() => this.handleSubscribe(save.id)}
                    goToOffers={() => this.goToOffers(save.slug)}
                  />
              )
            }
          </CardsList>
        </SwipeableViews>

        <Footer />

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

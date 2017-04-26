import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

import { savesMapper } from '../utils';
import withApi from '../components/hoc/withApi';
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
import LoginModal from '../components/auth/login-modal';
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

class Saves extends React.Component {
  static async getInitialProps(ctx) {
    const items = await ctx.api.get('/saves?filters[active]=true');
    const saves = savesMapper(items.data);
    return { saves };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      logged: props.isSignedIn,
      modalIsOpen: false,
      activeTab: props.isSignedIn ? 1 : 0,
      saves: props.saves,
      subscriptions: {
        count: 0,
        rows: []
      },
      subscribeTo: 0,
      showToast: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.loadSaves = this.loadSaves.bind(this);
    this.loadSubscriptions = this.loadSubscriptions.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.loadSaves();
      this.loadSubscriptions();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignedIn) {
      this.loadSaves();
      this.loadSubscriptions();
      this.closeModal();
    }
  }

  handleSubscribe(subscribeTo) {
    return this.props.api
      .post(`/saves/${subscribeTo}/subscriptions`)
      .then(() => {
        const item = this.state.saves.rows.find(
          save => save.id === subscribeTo
        );
        item.hasSubscribed = true;

        const subscriptionsRows = [...this.state.subscriptions.rows, item];

        this.setState({
          subscriptions: {
            count: subscriptionsRows.length,
            rows: subscriptionsRows
          },
          showToast: true
        });

        setTimeout(() => this.setState({ showToast: false }), 4000);
      });
  }

  goToOffers(slug) {
    Router.push(`/offer?saveId=${slug}`, `/offer/${slug}`);
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  loadSaves() {
    return this.props.api
      .get('/saves?filters[active]=true')
      .then(res => res.data)
      .then(saves => savesMapper(saves))
      .then((saves) => {
        this.setState({ saves });
      });
  }

  loadSubscriptions() {
    return this.props.api
      .get('/saves?filters[subscribed]=true')
      .then(res => res.data)
      .then(saves => savesMapper(saves))
      .then((subscriptions) => {
        this.setState({ subscriptions });
      });
  }

  openModal(subscribeTo) {
    this.setState({ modalIsOpen: true, subscribeTo });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  renderUserSaves() {
    return this.state.subscriptions.rows.length > 0
      ? this.state.subscriptions.rows.map(save => (
        <StyledCard
          {...save}
          key={save.id}
          logged={this.state.logged}
          openLoginModal={() => this.openModal(save.id)}
          handleSubscribe={() => this.handleSubscribe(save.id)}
          goToOffers={() => this.goToOffers(save.slug)}
          linkToBuy={save.winnerProduct && save.winnerProduct.link_buy}
        />
        ))
      : <BlankState>
        <Heading white>Ainda não tem nenhum save???</Heading>
        <Text white>
            O que você está esperando? Escolha os produtos que te interessam e participe do grupo que conseguirá os melhores descontos do mercado!
          </Text>
        <div>
          <Button outline onClick={() => this.handleChangeIndex(0)}>
              Ver todos os saves
            </Button>
        </div>
      </BlankState>;
  }

  render() {
    return (
      <Page hasFooter>
        <Toolbar logged={this.state.logged} onLogout={this.props.onLogout} />

        <Headline>
          Participe dos saves que você tem interesse e acompanhe toda a negociação até o melhor desconto.
        </Headline>

        {this.state.logged &&
          <Tabs
            withBorder
            index={this.state.activeTab}
            onChange={this.handleChangeIndex}
          >
            <Tab>Saves Abertos</Tab>
            <Tab>Meus Saves</Tab>
          </Tabs>}

        <SwipeableViews
          disabled={!this.state.logged}
          index={this.state.activeTab}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
        >
          <CardsList>
            {this.renderUserSaves()}
          </CardsList>

          <CardsList>
            {this.state.saves.rows &&
              this.state.saves.rows.map(save => (
                <StyledCard
                  {...save}
                  key={save.id}
                  logged={this.state.logged}
                  openLoginModal={() => this.openModal(save.id)}
                  handleSubscribe={() => this.handleSubscribe(save.id)}
                  goToOffers={() => this.goToOffers(save.slug)}
                />
              ))}
          </CardsList>
        </SwipeableViews>

        <Footer />

        <LoginModal
          isOpen={this.state.modalIsOpen}
          close={() => this.closeModal()}
        />

        <Toast show={this.state.showToast}>
          Você receberá um email com atualizações sobre esta negociação.
        </Toast>
      </Page>
    );
  }
}

export default withApi()(Saves);

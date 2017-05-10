import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import nl2br from 'react-nl2br';
import format from 'date-fns/format';
import { formatCurrency } from '../utils';

import { USER_LOCALSTORAGE_KEY } from '../store/auth';
import withAuth from '../components/hoc/withAuth';
import { colors } from '../components/styles/variables';
import Toolbar from '../components/toolbar';
import Page from '../components/common/page';
import Footer from '../components/footer';
import Container from '../components/common/container';
import {
  Heading,
  Heading2,
  Text,
  SmallText
} from '../components/common/typography';
import Button from '../components/common/button';
import Tabs from '../components/common/tabs';
import Tab from '../components/common/tab';
import { Row, Column } from '../components/common/grid';
import Panel from '../components/common/panel';
import Section from '../components/common/section';
import {
  ArrowBack,
  Buscape,
  ChevronLeft,
  ChevronRight
} from '../components/common/svg';
import Gallery from '../components/gallery';
import Headline from '../components/common/headline';
import RenderIf from '../components/common/render-if';
import Toast from '../components/common/toast';

const Header = styled(Container)`
  display: flex;
  padding: 8px 0;

  a {
    padding: 0 20px;
  }
`;

const CustomTabs = styled(Tabs)`
  flex-flow: row;
  flex-wrap: wrap;
`;

const CustomTab = styled(Tab)`
  background-color: ${props => (props.active ? colors.green : 'transparent')};
  border: 0;
  flex: 1;
  height: inherit;
  line-height: 24px;
  padding: 20px 20px 15px;

  ${props => props.active && 'border: 0'};

  @media (min-width: 640px) {
    max-width: 100%;
  }

  > h2 {
    color: ${props => (props.active ? colors.white : colors.green)}
  }

  > p {
    color: ${props => (props.active ? colors.white : colors.gray)}
  }
`;

const ItemHeader = styled.div`
  align-items: center;
  border-bottom: solid 1px ${colors.darkBlue};
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px 0;
`;

const GrayText = styled(Text)`
  color: ${colors.gray};
  font-weight: 500;
`;

const Tag = styled(Heading2)`
  background: ${colors.gray};
  font-size: 24px;
  padding: 2px 10px;
  text-transform: uppercase;
`;

const Price = styled.div`
  display: flex;
  justify-content: flex-end;

  > p {
    font-size: 14px;
    margin-right: 5px;
    line-height: 40px;
  }
`;

const AlignRight = styled.div`
  text-align: right;

  > a {
    margin: 20px 0;
  }
`;

const BuscapeBox = styled.div`
  background: ${colors.darkBlue};
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  margin: 10px 0;
  padding: 12px 24px;
  text-align: right;

  > * {
    display: block;
    margin: 5px 0;
  }

  p {
    font-size: 10px;
    font-weight: 500;
  }
`;

const BuscapeBadge = styled.a`
  background: ${colors.yellow};
  padding: 5px 10px 3px;
  text-align: center;

  p {
    align-items: center;
    display: flex;
    font-size: 10px;
    font-weight: 500;
    line-height: 28px;
  }

  svg {
    margin-left: 5px;
    margin-top: -5px;
  }
`;

const BuscapeDate = styled(SmallText)`
  color: ${colors.gray};
  display: inline-block;
  padding: 0 30px;
  text-align: center;
  width: 214px;
`;

const Icon = styled.i`
  height: 40px;
  flex: 0 0 40px;
  position: relative;
  width: 40px;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
`;

const Control = styled.div`
  background: ${colors.green};
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  font-family: 'Oswald', sans-serif;
  font-size: 24px;
  height: 40px;
  justify-content: space-between;
  overflow: hidden;
  position: absolute;
  text-transform: uppercase;
  transform: translateY(-20px);
  transition: .2s ease width;
  top: 396px;
  width: 40px;

  &:hover {
    width: 144px;
  }

  > span {
    margin: 0 10px;
    overflow: hidden;
  }
`;

const PrevArrow = styled(Control)`
  left: 0;
`;

const RightArrow = styled(Control)`
  flex-direction: row-reverse;
  right: 0;
`;

const Info = styled.div`
  margin: 20px 0;
`;

const MarginContainer = styled(Container)`
  margin: 20px auto;
`;

class Offer extends React.Component {
  static async getInitialProps(ctx) {
    const save = (await ctx.api.get(`/saves/${ctx.query.saveId}`)).data;
    return { save };
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.getWinnerProductIndex(props.save),
      save: props.save,
      products: props.save.Products,
      vote: 0,
      countdown: '...',
      showToastVotation: false
    };

    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.renderVotationButton = this.renderVotationButton.bind(this);
    this.renderCheckoutButton = this.renderCheckoutButton.bind(this);
    this.getCountdown = this.getCountdown.bind(this);
    this.removeToastVotation = this.removeToastVotation.bind(this);
    // TODO: Remover quando mergear a auth
    this.loadVote = this.loadVote.bind(this);

    this.timer = null;
  }

  removeToastVotation() {
    this.setState({ showToastVotation: false });
  }

  componentDidMount() {
    const accessToken = window.localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (accessToken) this.loadVote();

    this.timer = setInterval(() => {
      this.setState({
        countdown: this.getCountdown(
          this.props.save.checkoutOpen
            ? this.state.save.checkout_end
            : this.state.save.votation_end
        )
      });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignedIn) this.loadVote();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getWinnerProductIndex(save) {
    return !save.winnerProduct
      ? 0
      : save.Products.reduce(
          (acc, product, index) =>
            (product.id === save.winnerProduct.id ? index : acc),
          0
        );
  }

  loadVote() {
    return this.props.api
      .get(`/saves/${this.state.save.id}/votes`)
      .then(res => res.data)
      .then((vote) => {
        if (vote) this.setState({ vote: vote.ProductId });
      });
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  handleVote(productId) {
    if (this.state.vote !== productId) {
      this.props.api
        .post(`/saves/${this.state.save.id}/votes`, {
          ProductId: productId
        })
        .then(({ data }) => {
          this.setState({ vote: data.ProductId, showToastVotation: true });
        });
    }
  }

  renderVotationButton(product) {
    let ButtonText;

    if (this.state.vote === product.id) {
      ButtonText = 'Oferta escolhida';
    } else if (this.state.vote !== 0) {
      ButtonText = 'voto registrado';
    } else {
      ButtonText = 'Votar nesta oferta';
    }

    return (
      <Button
        large
        onClick={() => this.handleVote(product.id)}
        disabled={this.state.vote > 0}
      >
        {ButtonText}
      </Button>
    );
  }

  renderCheckoutButton(product) {
    return (
      <Button large href={product.link_buy} target="_blank">
        Comprar agora
      </Button>
    );
  }

  getCountdown(end) {
    const diffInMinutes = differenceInMinutes(new Date(end), new Date());
    return `${Math.floor(diffInMinutes / 60)}h ${diffInMinutes % 60}m`;
  }

  render() {
    return (
      <Page hasFooter>
        <Toolbar
          logged={this.props.isSignedIn}
          onLogout={this.props.onLogout}
        />

        <Header>
          <Link prefetch href="/saves"><a><ArrowBack /></a></Link>
          <div>
            <RenderIf expr={this.props.save.votationOpen}>
              <GrayText>Vote na melhor oferta de</GrayText>
            </RenderIf>
            <Heading white uppercase>{this.state.save.title}</Heading>
          </div>
        </Header>

        <RenderIf
          expr={this.props.save.checkoutOpen || this.props.save.votationOpen}
        >
          <Headline spotlight large>
            A
            {' '}
            {this.props.save.checkoutOpen ? 'oferta' : 'votação'}
            {' '}
            acaba em
            {' '}
            <b>{this.state.countdown}</b>
          </Headline>
        </RenderIf>

        <RenderIf expr={this.props.save.finished}>
          <Headline disabled large uppercase>
            Oferta encerrada
          </Headline>
        </RenderIf>

        <RenderIf expr={this.props.save.votationOpen}>
          <Section gray>
            <Container>
              <CustomTabs
                index={this.state.activeTab}
                onChange={this.handleChangeIndex}
              >
                {this.state.products.map((product, key) => (
                  <CustomTab key={product.id}>
                    <Heading2 color={colors.white}>Oferta {key + 1}</Heading2>
                    <Text white>R$ {formatCurrency(product.price)}</Text>
                  </CustomTab>
                ))}
              </CustomTabs>
            </Container>
          </Section>
        </RenderIf>

        <SwipeableViews
          index={this.state.activeTab}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
        >
          {this.state.products.map((product, key) => (
            <div key={product.id}>
              <Section white>
                <Gallery
                  images={[
                    product.image_default,
                    product.image2,
                    product.image3
                  ]}
                  alt={product.title}
                />
              </Section>

              <MarginContainer>
                <RenderIf expr={this.props.save.votationOpen}>
                  <ItemHeader>
                    <Tag white>Oferta {key + 1}</Tag>
                    {this.renderVotationButton(product)}
                  </ItemHeader>
                </RenderIf>

                <Row>
                  <Column>
                    <Heading white>{product.title}</Heading>
                    <Panel>
                      <RenderIf expr={!!product.description}>
                        <Info>
                          <h3>Descrição</h3>
                          {nl2br(product.description)}
                        </Info>
                      </RenderIf>

                      <RenderIf expr={!!product.technique_information}>
                        <Info>
                          <h3>Informações técnicas do produto</h3>
                          {nl2br(product.technique_information)}
                        </Info>
                      </RenderIf>
                    </Panel>
                  </Column>
                  <Column third>
                    <AlignRight>
                      <Text uppercase white>Oferta feita para o 99saves</Text>
                      <Price>
                        <Text white>R$</Text>
                        <Heading white large>
                          {formatCurrency(product.price)}
                        </Heading>
                      </Price>

                      <RenderIf expr={this.props.save.checkoutOpen}>
                        {this.renderCheckoutButton(product)}
                      </RenderIf>

                      <RenderIf
                        expr={!!(product.price_buscape && product.link_buscape)}
                      >
                        <BuscapeBox>
                          <Text uppercase white>Menor preço no Buscapé</Text>
                          <Price>
                            <Heading white>
                              R$ {formatCurrency(product.price_buscape)}
                            </Heading>
                          </Price>
                          <BuscapeBadge
                            href={product.link_buscape}
                            target="_blank"
                          >
                            <Text uppercase>
                              Pesquise você no <Buscape />
                            </Text>
                          </BuscapeBadge>
                        </BuscapeBox>
                      </RenderIf>

                      <RenderIf
                        expr={
                          !!(product.price_buscape &&
                            product.link_buscape &&
                            product.date_buscape)
                        }
                      >
                        <BuscapeDate>
                          Valor pesquisado pela equipe 99saves em
                          {' '}
                          {format(product.date_buscape, 'DD/MM [às] HH:mm')}
                        </BuscapeDate>
                      </RenderIf>
                    </AlignRight>
                  </Column>
                </Row>
              </MarginContainer>
            </div>
          ))}
        </SwipeableViews>

        <RenderIf
          expr={this.props.save.votationOpen && this.state.activeTab !== 0}
        >
          <PrevArrow
            onClick={() => this.handleChangeIndex(this.state.activeTab - 1)}
          >
            <Icon><ChevronLeft /></Icon>
            <span>Oferta {this.state.activeTab}</span>
          </PrevArrow>
        </RenderIf>

        <RenderIf
          expr={
            this.props.save.votationOpen &&
              this.state.activeTab !== this.state.products.length - 1
          }
        >
          <RightArrow
            onClick={() => this.handleChangeIndex(this.state.activeTab + 1)}
          >
            <Icon><ChevronRight /></Icon>
            <span>Oferta {this.state.activeTab + 2}</span>
          </RightArrow>
        </RenderIf>

        <Footer />
        <Toast
          show={this.state.showToastVotation}
          onFade={this.removeToastVotation}
        >
          Seu voto foi registrado. Em breve você conhecerá a oferta vencedora
        </Toast>
      </Page>
    );
  }
}

export default withAuth()(Offer);

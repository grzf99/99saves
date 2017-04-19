import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import { numeral } from '../utils';

import config from '../config';
import { colors } from '../components/styles/variables';
import Toolbar from '../components/toolbar';
import Page from '../components/common/page';
import Footer from '../components/footer';
import Container from '../components/common/container';
import { Heading, Heading2, Text } from '../components/common/typography';
import Button from '../components/common/button';
import Tabs from '../components/common/tabs';
import Tab from '../components/common/tab';
import { Row, Column } from '../components/common/grid';
import Panel from '../components/common/panel';
import Section from '../components/common/section';
import { ArrowBack, ChevronLeft, ChevronRight } from '../components/common/svg';
import Image from '../components/common/image';
import Gallery from '../components/gallery';

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
  background-color: ${props => props.active ? colors.green : 'transparent' };
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
    color: ${props => props.active ? colors.white : colors.green}
  }

  > p {
    color: ${props => props.active ? colors.white : colors.gray}
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

const Buscape = styled.div`
  font-family: 'Roboto', sans-serif;
  margin: 10px 0;
  text-align: right;

  > * {
    display: block;
    margin: 5px 0;
  }

  > a {
    color: ${colors.green};
    font-size: 12px;
    text-decoration: underline;
  }

  > s {
    color: ${colors.alternateWhite};
    font-size: 15px;
  }
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
  top: 346px;
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

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const save = (await axios.get(`${config.API_URL}/saves/${query.saveId}`)).data;
    const vote = (await axios.get(`${config.API_URL}/saves/${save.id}/votes`)).data;

    const now = Date.now();
    const dateEnd = new Date(save.date_end).getTime();
    const votationEnd = new Date(save.votation_end).getTime();
    const checkoutEnd = new Date(save.checkout_end).getTime();

    const votationOpen = now > dateEnd && now <= votationEnd;
    const checkoutOpen = now > votationEnd && now < checkoutEnd;

    // TODO: Consultar base de dados para checar qual o vencedor
    const winnerIndex = Math.floor(Math.random() * save.Products.length) + 1;

    return { save, vote, votationOpen, checkoutOpen, winnerIndex };
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.winnerIndex !== -1 ? props.winnerIndex : 0,
      products: props.save.Products,
      vote: props.vote ? props.vote.ProductId : 0
    };

    this.formatCurrency = this.formatCurrency.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.renderVotationButton = this.renderVotationButton.bind(this);
    this.renderCheckoutButton = this.renderCheckoutButton.bind(this);
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  handleVote(productId) {
    if (this.state.vote !== productId) {
      axios.post(`${config.API_URL}/saves/${this.props.save.id}/votes`, {
        ProductId: productId
      })
      .then(({ data }) => {
        this.setState({ vote: data.ProductId });
      });
    }
  }

  handleCheckout(product) {
    console.log(product);
  }

  formatCurrency(value) {
    return numeral(value).format('0,0[.]00');
  }

  renderVotationButton(product) {
    let ButtonText;

    if (this.state.vote === product.id) {
      ButtonText = 'Oferta escolhida';
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
      <Button
        large
        onClick={() => this.handleCheckout(product)}
      >
        Comprar agora
      </Button>
    );
  }

  render() {
    return (
      <Page hasFooter>
        <Toolbar />

        <Header>
          <Link prefetch href="/"><a><ArrowBack /></a></Link>
          <div>
            <GrayText>Vote na melhor oferta de</GrayText>
            <Heading white uppercase>{this.props.save.title}</Heading>
          </div>
        </Header>

        {
          this.props.votationOpen && (
            <Section gray>
              <Container>
                <CustomTabs index={this.state.activeTab} onChange={this.handleChangeIndex}>
                  {
                    this.state.products.map((product, key) => (
                      <CustomTab key={product.id}>
                        <Heading2 white>Oferta {key + 1}</Heading2>
                        <Text white>R$ {this.formatCurrency(product.price)}</Text>
                      </CustomTab>
                    ))
                  }
                </CustomTabs>
              </Container>
            </Section>
          )
        }

        <SwipeableViews
          index={this.state.activeTab}
          onChangeIndex={this.handleChangeIndex}
          animateHeight
        >
          {
            this.state.products.map((product, key) => (
              <div key={product.id}>
                <Section white>
                  <Gallery>
                    <Image src={product.image_default} alt={product.title} />
                  </Gallery>
                </Section>

                <Container>
                  <ItemHeader>
                    {
                      this.props.votationOpen && <Tag white>Oferta {key + 1}</Tag>
                    }
                    {
                      this.props.votationOpen && this.renderVotationButton(product)
                    }
                  </ItemHeader>

                  <Row>
                    <Column>
                      <Heading white>{product.title}</Heading>
                      <Panel>
                        {
                          product.description && (
                            <div>
                              <h3>Descrição</h3>
                              {product.description}
                            </div>
                          )
                        }
                        {
                          product.technique_information && (
                            <div>
                              <h3>Informações técnicas do produto</h3>
                              {product.technique_information}
                            </div>
                          )
                        }
                      </Panel>
                    </Column>
                    <Column third>
                      <AlignRight>
                        <Price>
                          <Text white>R$</Text>
                          <Heading white large>
                            {
                              this.formatCurrency(product.price)
                            }
                          </Heading>
                        </Price>
                        {
                          this.props.checkoutOpen && this.renderCheckoutButton(product)
                        }
                        {
                          (product.price_buscape && product.link_buscape) && (
                            <Buscape>
                              <a href={product.link_buscape}>melhor preço no buscapé</a>
                              <s>
                                R$&nbsp;
                                {
                                  this.formatCurrency(product.price_buscape)
                                }
                              </s>
                            </Buscape>
                          )
                        }
                      </AlignRight>
                    </Column>
                  </Row>
                </Container>
              </div>
            ))
          }
        </SwipeableViews>

        {
          this.props.votationOpen && this.state.activeTab !== 0 && (
            <PrevArrow onClick={() => this.handleChangeIndex(this.state.activeTab - 1)}>
              <Icon><ChevronLeft /></Icon>
              <span>Oferta {this.state.activeTab}</span>
            </PrevArrow>
          )
        }

        {
          this.props.votationOpen && this.state.activeTab !== (this.state.products.length - 1) && (
            <RightArrow onClick={() => this.handleChangeIndex(this.state.activeTab + 1)}>
              <Icon><ChevronRight /></Icon>
              <span>Oferta {this.state.activeTab + 2}</span>
            </RightArrow>
          )
        }

        <Footer />
      </Page>
    );
  }
}

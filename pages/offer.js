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
    return { save, vote };
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      title: props.save.title,
      products: props.save.Products,
      vote: props.vote ? props.vote.ProductId : 0
    };

    this.formatCurrency = this.formatCurrency.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleVoteClick = this.handleVoteClick.bind(this);
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  handleVoteClick(productId) {
    if (this.state.vote !== productId) {
      axios.post(`${config.API_URL}/saves/${this.props.save.id}/votes`, {
        ProductId: productId
      })
      .then(({ data }) => {
        this.setState({ vote: data.ProductId });
      });
    }
  }

  formatCurrency(value) {
    return numeral(value).format('0,0[.]00');
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
                    <Tag white>Oferta {key + 1}</Tag>
                    <Button
                      large
                      onClick={() => this.handleVoteClick(product.id)}
                      disabled={this.state.vote > 0}
                    >
                      {
                        this.state.vote === product.id
                          ? <span>Oferta escolhida</span>
                          : <span>Votar nesta oferta</span>
                      }
                    </Button>
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
                      <Price>
                        <Text white>R$</Text>
                        <Heading white large>
                          {
                            this.formatCurrency(product.price)
                          }
                        </Heading>
                      </Price>
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
                    </Column>
                  </Row>
                </Container>
              </div>
            ))
          }
        </SwipeableViews>

        {
          this.state.activeTab !== 0 && (
            <PrevArrow onClick={() => this.handleChangeIndex(this.state.activeTab - 1)}>
              <Icon><ChevronLeft /></Icon>
              <span>Oferta {this.state.activeTab}</span>
            </PrevArrow>
          )
        }

        {
          this.state.activeTab !== (this.state.products.length - 1) && (
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
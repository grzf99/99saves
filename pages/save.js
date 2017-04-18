import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import 'isomorphic-fetch';
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
import { ArrowBack } from '../components/common/svg';
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

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const save = await (await fetch(`${config.API_URL}/saves/${query.offer}`)).json();
    return { save };
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      title: props.save.title,
      products: props.save.Products
    };

    this.formatCurrency = this.formatCurrency.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
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
                    <Button large>Votar nesta oferta</Button>
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
                    </Column>
                  </Row>
                </Container>
              </div>
            ))
          }
        </SwipeableViews>

        <Footer />
      </Page>
    );
  }
}

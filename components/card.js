import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { colors } from './styles/variables';
import Button from './common/button';
import Image from './common/image';
import Headline from './common/headline';
import RenderIf from './common/render-if';
import { Heading, Text, SmallText } from './common/typography';
import { formatCurrency } from '../utils';

const Card = styled.div`
  background: ${colors.black};
  border: 1px solid ${rgba(255, 255, 255, 0.1)};
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-between;
  min-height: 333px;
  padding-bottom: 24px;
  position: relative;
  text-align: center;
  width: 100%;
`;

const Tag = styled(Text)`
  background: ${colors.blue};
  color: ${colors.white};
  display: block;
  font-size: 12px;
  font-weight: 400;
  padding: 5px 14px;
  position: absolute;
  top: 15px;
  z-index: 3;
`;

const ImagesContainer = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const CardImage = styled(Image)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Header = styled.div`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  padding-top: 24px;
  position: relative;
`;

const Gradient = styled.div`
  background-image: linear-gradient(to bottom, rgba(29, 32, 40, 0.0), ${colors.black});
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 80px;
  position: absolute;
  width: 100%;

  > * {
    transform: translateY(20px);
  }
`;

const Info = styled.div`
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;

  > * + * {
    margin-top: 16px;
  }
`;

const CustomText = styled(Text)`
  align-items: center;
  color: ${colors.lightgray};
  display: -webkit-box;
  height: 42px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Status = styled.div`
  background: ${colors.gray};
  color: ${colors.white};
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  padding: 3px;
  position: absolute;
  text-transform: uppercase;
  top: 0;
  width: 100%;
`;

const Buscape = styled(Text)`
  color: ${colors.gray};
  margin-top: -16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 0;

  a {
    width: 100%;
  }

  a + a {
    margin-left: 10px;
  }
`;

export default class extends React.Component {
  constructor(props) {
    super(props);

    const now = Date.now();
    const dateEnd = new Date(props.date_end).getTime();
    const votationEnd = new Date(props.votation_end).getTime();
    const checkoutEnd = new Date(props.checkout_end).getTime();

    const votationOpen = now > dateEnd && now <= votationEnd;
    const checkoutOpen = now > votationEnd && now < checkoutEnd;

    this.state = {
      votationOpen,
      checkoutOpen
    };

    this.handleSave = this.handleSave.bind(this);
    this.goToOffers = this.goToOffers.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }

  handleSave() {
    if (!this.props.logged) {
      this.props.openLoginModal();
    } else if (!this.props.hasSubscribed) {
      this.props.handleSubscribe();
    }
  }

  goToOffers() {
    this.props.goToOffers();
  }

  goToCheckout() {
    this.props.goToCheckout();
  }

  renderButton() {
    if (!this.props.hasSubscribed) {
      return (
        <Button block onClick={this.handleSave}>Participar deste save</Button>
      );
    } else if (this.state.votationOpen) {
      return (
        <Button block onClick={this.goToOffers}>Participar da votação</Button>
      );
    } else if (this.state.checkoutOpen) {
      return <Button block onClick={this.goToOffers}>Comprar agora</Button>;
    }

    return (
      <Button block disabled onClick={this.handleSave}>
        Participando: Aguarde o encerramento
      </Button>
    );
  }

  renderImages() {
    let images;

    if (this.state.votationOpen && this.props.Products.length > 0) {
      images = this.props.Products.map(product => (
        <ImageWrapper>
          <CardImage src={product.image_default} alt={product.title} />
        </ImageWrapper>
      ));
    } else {
      images = (
        <ImageWrapper>
          <CardImage src={this.props.image_default} alt={this.props.title} />
        </ImageWrapper>
      );
    }

    return (
      <ImagesContainer>
        {images}
      </ImagesContainer>
    );
  }

  render() {
    return (
      <Card {...this.props}>
        {this.state.votationOpen && <Tag uppercase>Votação</Tag>}
        <Header>
          {this.renderImages()}
          <Gradient>
            <RenderIf
              expr={!this.state.checkoutOpen && !this.state.votationOpen}
            >
              <SmallText>imagem meramente ilustrativa</SmallText>
            </RenderIf>
            <Heading white>{this.props.title}</Heading>
          </Gradient>
        </Header>

        <RenderIf expr={this.state.checkoutOpen}>
          <Headline spotlight uppercase withRoboto>
            Oferta vencedora R$
            {' '}
            {formatCurrency(
              this.props.winnerProduct && this.props.winnerProduct.price
            )}
          </Headline>
        </RenderIf>

        <RenderIf expr={this.state.checkoutOpen}>
          <Buscape>
            menor preço no Buscapé: R$
            {' '}
            {formatCurrency(
              this.props.winnerProduct && this.props.winnerProduct.price_buscape
            )}
            *
          </Buscape>
        </RenderIf>

        <RenderIf expr={this.state.checkoutOpen}>
          <ButtonGroup>
            <Button block outline onClick={this.goToOffers}>
              Sobre o produto
            </Button>
            <Button block href={this.props.winnerProduct && this.props.winnerProduct.link_buy}>Comprar agora</Button>
          </ButtonGroup>
        </RenderIf>

        <RenderIf expr={!this.state.checkoutOpen}>
          <Info>
            <RenderIf expr={!this.state.votationOpen}>
              <CustomText>{this.props.description}</CustomText>
            </RenderIf>
            <RenderIf expr={this.state.votationOpen}>
              <CustomText>Escolha a melhor oferta</CustomText>
            </RenderIf>
            {this.renderButton()}
          </Info>
        </RenderIf>
      </Card>
    );
  }
}

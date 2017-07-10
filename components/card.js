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
import CountDown from '../components/common/countdown';
import CheckoutModal from '../components/common/checkout-modal';
import moment from 'moment';

const Card = styled.div`
  background: ${colors.black};
  border: 1px solid ${rgba(255, 255, 255, 0.1)};
  display: flex;
  flex-direction: column;
  height: 390px;
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
  top: 22px;
  z-index: 3;
  ${props => props.gray ? `background-color: ${colors.gray}` : ''}
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
  max-width: auto;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Header = styled.div`
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: ${(props) => props.noCountdown ? '51px' : '24px'};
  height: ${(props) => props.noCountdown ? '263px' : '235px'};
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
  padding: 16px 16px 0 16px;
`;

const CustomText = styled(Text)`
  align-items: center;
  color: ${colors.lightgray};
  display: -webkit-box;
  height: 50px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const DateStart = styled(Text)`
  align-items: center;
  color: ${colors.gray};
  display: -webkit-box;
  overflow: hidden;
  font-size: 10px;
  margin-top: 10px;
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
  height: 30px;
  width: 100%;
  z-index: 3;
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
    moment.locale('pt-BR');

    this.state = {
      checkoutModalIsOpen: false
    };

    this.handleSave = this.handleSave.bind(this);
    this.goToOffers = this.goToOffers.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }

  openCheckoutModal(subscribeTo) {
    this.setState({ checkoutModalIsOpen: true });
  }

  closeModal() {
    this.setState({ checkoutModalIsOpen: false });
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
    } else if (this.props.negotiationOpen) {
      return (
        <CustomText>Em breve você conhecerá as que ofertas feitas pelos fabricantes e escolherá a melhor</CustomText>
      );
    } else if (this.props.votationOpen) {
      return (
        <Button block onClick={this.goToOffers}>Participar da votação</Button>
      );
    } else if (this.props.checkoutOpen) {
      return <Button block onClick={this.goToOffers}>Comprar agora</Button>;
    } else if (this.props.finished) {
      return (
        <Button block outline onClick={this.goToOffers}>Sobre o produto</Button>
      );
    }

    if (!this.props.endedWithoutOffers)
      return (
        <Button block disabled onClick={this.handleSave}>
          Participando: Aguarde o encerramento
        </Button>
      );
  }

  renderImages() {
    let images;

    if (this.props.votationOpen && this.props.Products.length > 0) {
      images = this.props.Products.map(product => (
        <ImageWrapper key={product.id}>
          <CardImage src={product.image_default} alt={product.title} />
        </ImageWrapper>
      ));
    } else if (this.props.checkoutOpen && this.props.winnerProduct) {
      images = (
        <ImageWrapper>
          <CardImage
            src={this.props.winnerProduct.image_default}
            alt={this.props.winnerProduct.title}
          />
        </ImageWrapper>
      );
    } else if (this.props.finished && this.props.winnerProduct) {
      images = (
        <ImageWrapper>
          <CardImage
            src={this.props.winnerProduct.image_default}
            alt={this.props.winnerProduct.title}
          />
        </ImageWrapper>
      );
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
      <Card {...this.props} data-status={this.props.status}>
        <RenderIf expr={!this.props.negotiationOpen}>
          <CountDown {...this.props} className="card" />
        </RenderIf>
        <RenderIf expr={this.props.finished || this.props.endedWithoutOffers}>
          <Status>Oferta encerrada</Status>
        </RenderIf>
        <Header noCountdown={this.props.negotiationOpen}>
          <RenderIf expr={this.props.votationOpen}>
            <Tag uppercase>Votação</Tag>
          </RenderIf>
          <RenderIf expr={this.props.negotiationOpen}>
            <Tag uppercase gray>Negociação</Tag>
          </RenderIf>
          {this.renderImages()}
          <Gradient>
            <RenderIf
              expr={!this.props.checkoutOpen && !this.props.votationOpen}
            >
              <SmallText>imagem meramente ilustrativa</SmallText>
            </RenderIf>
            <Heading color={colors.white}>{this.props.title}</Heading>
          </Gradient>
        </Header>

        <RenderIf expr={this.props.checkoutOpen || this.props.finished}>
          <Headline
            spotlight={!this.props.finished}
            disabled={this.props.finished}
            uppercase
            withRoboto
          >
            Oferta vencedora R$
            {' '}
            {formatCurrency(
              this.props.winnerProduct && this.props.winnerProduct.price
            )}
          </Headline>
        </RenderIf>

        <RenderIf expr={this.props.checkoutOpen}>
          <Buscape>
            menor preço no Buscapé: R$
            {' '}
            {formatCurrency(
              this.props.winnerProduct && this.props.winnerProduct.price_buscape
            )}
            *
          </Buscape>
        </RenderIf>

        <RenderIf expr={!this.props.endedWithoutOffers}>
          <RenderIf expr={this.props.checkoutOpen}>
            <ButtonGroup>
              <Button block outline onClick={this.goToOffers}>
                Sobre o produto
              </Button>
              <Button
                block
                target="_blank"
                onClick={() => this.openCheckoutModal()}
              >
                Comprar agora
              </Button>
              <CheckoutModal
                isOpen={this.state.checkoutModalIsOpen}
                onClose={() => this.closeModal()}
                save={this.props}
                api={this.props.api}
                width="400px"
              />
            </ButtonGroup>
          </RenderIf>
        </RenderIf>

        <RenderIf expr={!this.props.checkoutOpen}>
          <Info>
            <RenderIf expr={!this.props.votationOpen}>
              <CustomText>{this.props.description}</CustomText>
            </RenderIf>
            <RenderIf expr={this.props.endedWithoutOffers}>
              <CustomText>Este foi um Save que os fabricantes não conseguiram superar a melhor oferta encontrada no mercado.</CustomText>
            </RenderIf>
            <RenderIf expr={this.props.votationOpen}>
              <CustomText>Escolha a melhor oferta</CustomText>
            </RenderIf>
            {this.renderButton()}
          </Info>
        </RenderIf>
        <DateStart title={moment(this.props.date_start).format('DD/MM/YYYY')}>iniciado há {moment(this.props.date_start).fromNow()}</DateStart>
      </Card>
    );
  }
}

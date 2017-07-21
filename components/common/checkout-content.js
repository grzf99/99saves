import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '../common/input';
import Button from '../common/button';
import RenderIf from '../common/render-if';
import { colors } from '../styles/variables';
import {
  Heading,
  Heading2,
  Text,
  SeparatorText,
  FormAlert
} from '../common/typography';
import CopyToClipboard from 'react-copy-to-clipboard';
const _ = require('lodash');

const Header = styled.div`
  padding-bottom: 30px;
`;

const Title = styled(Heading)`
  line-height: 1.47;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const SpecialLink = styled.a`
  color: ${colors.green}
`;


const LoginData = styled.span`
  color: ${colors.green}
`;

const InputButton = styled.div`
  display: flex;
  align-items: center;
  align-content: flex-start;
  margin-bottom: 30px;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;


const InputCopy = styled.div`
  background: ${colors.alternateWhite};
  border: 1px solid ${colors.lightgray};
  border-radius: 2px;
  color: ${colors.black};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  height: 34px;
  padding: 9px;
  text-align: center;
  width: 198px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const MessageCopied = styled.div`
  color: ${colors.green};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  margin: -10px 0 20px ;
`;

const ContentButton = styled.div`
  margin-top: 30px;
`;

const ButtonCopy = styled(Button)`

  @media (max-width: 480px) {
    margin-top: 20px;
    width: 100%;
  }
`;

class CheckoutContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  async componentDidMount() {
    const coupon = (await this.props.api.get(`/saves/getCoupon/${this.props.save.id}`)).data;
    console.log(coupon);
    this.setState({ coupon })
  }

  render() {
    return (
      <div>
        <Header>
          <Title large uppercase>Saiba como comprar</Title>
          <Heading2 fontWeight="500" color={colors.lightgray}>
            1º passo - Copie seu cupom
          </Heading2>
        </Header>

        <InputButton>
          <InputCopy>{this.state.coupon && this.state.coupon.key}</InputCopy>
          <CopyToClipboard
            text={this.state.coupon && this.state.coupon.key}
            onCopy={() => this.setState({copied: true})}
          >
            <ButtonCopy block>copiar cupom</ButtonCopy>
          </CopyToClipboard>
        </InputButton>

        <RenderIf expr={this.state.copied}>
          <MessageCopied>Cupom copiado para área de transferência</MessageCopied>
        </RenderIf>

        { this.props.save.winnerProduct.ProviderId != 10 &&
            <Heading2 fontWeight="500" color={colors.lightgray}>
              2º passo - Vá para o site do fabricante e compre usando seu cupom do 99saves
            </Heading2> }

          { this.props.save.winnerProduct.ProviderId == 10 &&
            <Heading2 fontWeight="500" color={colors.lightgray}>
              2º passo - <SpecialLink href='https://checkout.suggar.com.br/Parceiro/LoginFechado?p=HZ523h5puX71DQj9KdQwHA==' target='_blank'> Clique aqui </SpecialLink> para acessar a área exclusiva utilizando o seguinte Usuário e Senha<br/>
              <p>
                &nbsp;&nbsp;- Usuário: <LoginData>99saves</LoginData><br/>
                &nbsp;&nbsp;- Senha: <LoginData>99saves2017</LoginData>
              </p>
            </Heading2> }
          { this.props.save.winnerProduct.ProviderId == 10 &&
            <Heading2 fontWeight="500" color={colors.lightgray}>
              3º passo - Pronto você está na área exclusiva 99saves, basta clicar no botão abaixo e ir direto para o produto e aproveitar seu desconto.
            </Heading2> }

        <ContentButton>
          <Button
            block
            large
            href={this.props.save.winnerProduct.link_buy}
            target="_blank"
          >
            ir para o site do fabricante
          </Button>
        </ContentButton>
      </div>
    );
  }
}

export default CheckoutContent;

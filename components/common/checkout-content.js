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
      value: this.getCupon(),
      copied: false
    };
  }

  getCupon() {
    const [subscription] = this.props.save.Subscriptions;
    return subscription.Coupon.key;
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
          <InputCopy>{this.state.value}</InputCopy>
          <CopyToClipboard
            text={this.state.value}
            onCopy={() => this.setState({copied: true})}
          >
            <ButtonCopy block>copiar cupom</ButtonCopy>
          </CopyToClipboard>
        </InputButton>

        <RenderIf expr={this.state.copied}>
          <MessageCopied>Cupom copiado para área de transferência</MessageCopied>
        </RenderIf>

        <Heading2 fontWeight="500" color={colors.lightgray}>
          2º passo - Vá para o site do fabricante e compre usando seu cupom do 99saves
        </Heading2>

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

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

const Header = styled.div`
  padding-bottom: 30px;
`;

const Title = styled(Heading)`
  line-height: 1.47;
  margin-bottom: 30px;
`;

const InputButton = styled.div`
  display: flex;
  align-items: center;
  align-content: flex-start;
  margin-bottom: 30px;
  width: 100%;
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

class CheckoutContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.product.Subscriptions[0].CouponId,
      copied: false
    };
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
          <InputCopy>{this.props.product.Subscriptions[0].CouponId}</InputCopy>
          <CopyToClipboard
            text={this.state.value}
            onCopy={() => this.setState({copied: true})}
          >
            <Button block>copiar cupom</Button>
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
            href={this.props.product.Products[0].link_buy}
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

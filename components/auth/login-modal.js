import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '../common/modal';
import LoginForm from './login-form';
import FacebookButton from '../common/facebook-button';
import { colors } from '../styles/variables';
import { Heading, SubHeading, Text } from '../common/typography';

const Header = styled.div`
  padding-bottom: 30px;
`;

const CloseButton = styled(Text)`
  position: absolute;
  font-size: 16px;
  color: ${colors.green};
  top: 19px;
  right: 19px;
  cursor: pointer;
`;

const Title = styled(Heading)`
  line-height: 1.47;
`;

const SeparatorText = styled(Text)`
  display: block;
  padding: 11px 0 13px 0;
  font-size: 17px;
  text-align: center;
  color: ${colors.lightgray};
`;

const Footer = styled.div`
  display: flex;
  padding-top: 42px;
`;

const ForgotPasswordText = styled(Text)`
  flex: 1;
  font-size: 14px;
  color: ${colors.lightgray};
  text-transform: uppercase;
  cursor: pointer;
`;

const CreateAccountText = styled(Text)`
  flex: 1;
  font-size: 14px;
  color: ${colors.green};
  text-align: right;
  text-transform: uppercase;
  cursor: pointer;
`

export default class extends Component {
  render () {
    return (
      <Modal
        isOpen={true}
        width="400px"
      >
        <CloseButton>X</CloseButton>
        <Header>
          <Title large uppercase>Entre agora</Title>
          <SubHeading uppercase>Veja os descontos disponíveis no 99saves.com</SubHeading>
        </Header>
        <LoginForm />
        <SeparatorText>ou</SeparatorText>
        <FacebookButton block>
          Login com Facebook
        </FacebookButton>
        <Footer>
          <ForgotPasswordText>Esqueci a senha</ForgotPasswordText>
          <CreateAccountText>Criar nova conta</CreateAccountText>
        </Footer>
      </Modal>
    )
  }
}

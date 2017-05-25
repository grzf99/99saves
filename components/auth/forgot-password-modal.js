import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Modal from '../common/modal';
import { Heading, Text, FormAlert } from '../common/typography';
import Input from '../common/input';
import Button from '../common/button';
import Form from '../common/form';
import { colors } from '../styles/variables';
import { email } from '../../utils/validation';
import RenderIf from '../common/render-if';

const Header = styled.div`
  padding-bottom: 30px;
`;

const Title = styled(Heading)`
  line-height: 1.47;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Footer = styled.div`
  display: flex;
  padding-top: 15px;
`;

const CreateAccountText = styled(Text)`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.green};
  text-align: right;
  text-transform: uppercase;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  margin-top: 27px;
  flex: 1;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      step: 1,
      loading: false,
      errorApi: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleKeyUp(e) {
    if (e.key === 'Enter' && this.state.email !== '') {
      this.handleSubmit(e);
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    this.setState({ loading: true });
    this.props.api.post('/auth/forgot-password', { email }).then(() => {
      this.setState({ step: 2, loading: false, email: '' });
    })
    .catch(error => {
      this.setState({ errorApi: true, loading: false });
    });
  }

  handleClose() {
    this.props.onClose();
    this.setState({ step: 1 });
  }

  renderStep1() {
    return (
      <div>
        <Header>
          <Title large uppercase>Esqueceu a senha?</Title>
          <Text color={colors.lightgray}>
            Digite seu endereço de e-mail e nós enviaremos um
            link para sua caixa postal para redefinir sua senha.
          </Text>
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <RenderIf expr={this.state.errorApi}>
            <FormAlert>E-mail não existe</FormAlert>
          </RenderIf>
          <Input
            block
            name="email"
            type="email"
            label="Email"
            placeholder="exemplo@exemplo.com"
            onChange={this.handleChange}
            value={this.state.email}
            onKeyUp={this.handleKeyUp}
            validation={email}
          />
          <SubmitButton
            block
            large
            disabled={this.state.loading || this.state.email === ''}
            onClick={this.handleSubmit}
            type="submit"
          >
            Recuperar senha
          </SubmitButton>
        </Form>
        <Footer>
          <Link prefetch href="/signup">
            <CreateAccountText>Criar nova conta</CreateAccountText>
          </Link>
        </Footer>
      </div>
    );
  }

  renderStep2() {
    return (
      <div>
        <Title large uppercase>Cheque seu email</Title>
        <Text color={colors.lightgray}>
          Enviamos um email que permitirá você alterar sua senha de acesso ao 99saves.com.
        </Text>
        <Footer>
          <SubmitButton block large onClick={this.handleClose}>
            Entendi
          </SubmitButton>
        </Footer>
      </div>
    );
  }

  render() {
    return (
      <Modal {...this.props} width="88%">
        {this.state.step === 1 ? this.renderStep1() : null}
        {this.state.step === 2 ? this.renderStep2() : null}
      </Modal>
    );
  }
}

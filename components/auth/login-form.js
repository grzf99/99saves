import React, { Component, PropTypes } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login } from '../../store/auth';
import Input from '../common/input';
import Button from '../common/button';
import FacebookButton from '../common/facebook-button';
import Form from '../common/form';
import RenderIf from '../common/render-if';
import { colors } from '../styles/variables';
import {
  Heading,
  Heading2,
  Text,
  SeparatorText,
  FormAlert
} from '../common/typography';
import { email, minLength } from '../../utils/validation';

const Header = styled.div`
  padding-bottom: 30px;
`;

const Title = styled(Heading)`
  line-height: 1.47;
`;

const Footer = styled.div`
  display: block;
`;

const ButtonContainer = styled.div`
  display: block;
  width: 250px;
  margin: auto;
`;

const ForgotPasswordButton = styled.a`
  text-align: right;
  padding: 0;
  margin: 2px 0 25px 0;
  color: ${colors.lightgray};
  text-transform: lowercase;
  font-family: 'Roboto';
  font-size: 14px;
  cursor: pointer;
  display: block;
  width: 100%;
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

class LoginForm extends Component {
  static propTypes = {
    submitText: PropTypes.string,
    isAdmin: PropTypes.bool,
    isProvider: PropTypes.bool,
    onForgotPassword: PropTypes.func
  };

  static defaultProps = {
    submitText: 'Entrar',
    isAdmin: false,
    isProvider: false,
    onForgotPassword: () => {}
  };

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isAdmin, isProvider, as, pathname, query } = this.props;
    if (nextProps.isSignedIn) {
      const defaultUrl = isAdmin ? '/admin' : isProvider ? '/parceiro' : '/saves';
      Router.replace(
        {
          pathname: pathname || defaultUrl,
          query: query ? JSON.parse(query) : {}
        },
        as
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password, this.props.isAdmin);
  }

  keyHandle = (e) => {
    if (e.key === 'Enter' && this.isFormValid()) {
      this.handleSubmit(e);
    }
  };

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  isFormValid() {
    return this.state.email !== '' && this.state.password !== '';
  }

  render() {
    return (
      <div>
        <RenderIf expr={!this.props.isAdmin && !this.props.isProvider}>
          <Header>
            <Title large uppercase>Entre agora</Title>
            <Heading2 uppercase fontWeight="500" color={colors.lightgray}>
              Compre pelo melhor preço no 99saves.com
            </Heading2>
          </Header>
        </RenderIf>
        <Form onSubmit={this.handleSubmit}>
          <RenderIf expr={this.props.error !== undefined}>
            <FormAlert>Usuário ou senha inválidos.</FormAlert>
          </RenderIf>
          <Input
            block
            name="email"
            type="email"
            label="Email"
            placeholder="exemplo@exemplo.com"
            onChange={this.handleChange}
            value={this.state.email}
            onKeyUp={this.keyHandle}
            validation={email}
          />
          <Input
            block
            name="password"
            type="password"
            label="Senha"
            placeholder="sua senha"
            onChange={this.handleChange}
            value={this.state.password}
            onKeyUp={this.keyHandle}
            validation={minLength(8)}
          />
        </Form>
        <ButtonContainer>
          <Button
            block
            large
            disabled={this.props.loading || !this.isFormValid()}
            onClick={this.handleSubmit}
            type="submit"
          >
            {this.props.submitText}
          </Button>
          <RenderIf expr={false}>
            <div>
              <SeparatorText>ou</SeparatorText>
              <FacebookButton block>Login com facebook</FacebookButton>
            </div>
          </RenderIf>
          <RenderIf expr={!this.props.isAdmin}>
            <Footer>
              <ForgotPasswordButton onClick={this.props.onForgotPassword}>
                Esqueci a senha
              </ForgotPasswordButton>
              <Button block large href="/signup">
                Criar nova conta
              </Button>
            </Footer>
          </RenderIf>
        </ButtonContainer>
      </div>
    );
  }
}

export default connect(
  ({ auth, currentUser }) => ({
    loading: auth.login.loading,
    error: auth.login.error,
    isSignedIn: currentUser.token !== undefined
  }),
  { login }
)(LoginForm);

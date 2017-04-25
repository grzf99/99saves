import React, { Component, PropTypes } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login } from '../../store/auth';
import Input from '../common/input';
import SubmitButton from '../common/submit-button';
import FacebookButton from '../common/facebook-button';
import Form from '../common/form';
import RenderIf from '../common/render-if';
import { colors } from '../styles/variables';
import { Heading, Heading2, Text, SeparatorText } from '../common/typography';

const Header = styled.div`
  padding-bottom: 30px;
`;

const Title = styled(Heading)`
  line-height: 1.47;
`;

const Footer = styled.div`
  display: flex;
  padding-top: 42px;
`;

const ForgotPasswordText = styled(Text)`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.lightgray};
  text-transform: uppercase;
  cursor: pointer;
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

const Alert = styled(Text)`
  color: ${colors.red};
  margin-bottom: 13px;
  font-size: 14px;
`;

class LoginForm extends Component {
  static propTypes = {
    submitText: PropTypes.string,
    isAdmin: PropTypes.bool
  };

  static defaultProps = {
    submitText: 'Login com email',
    isAdmin: false
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
    const { isAdmin } = this.props;
    if (nextProps.isSignedIn) {
      // TODO: Alter this to redirect to the page where the user was before login
      // Probably using a ?reditectTo query param
      const url = isAdmin ? '/admin' : '/';
      Router.replace(url);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { isAdmin } = this.props;
    this.props.login(email, password, isAdmin);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    return (
      <div>
        <RenderIf expr={!this.props.isAdmin}>
          <Header>
            <Title large uppercase>Entre agora</Title>
            <Heading2 uppercase fontWeight="500" color={colors.lightgray}>
              Veja os descontos disponíveis no 99saves.com
            </Heading2>
          </Header>
        </RenderIf>
        <Form onSubmit={this.handleSubmit}>
          <RenderIf expr={this.props.error !== undefined}>
            <Alert>Usuário ou senha inválidos.</Alert>
          </RenderIf>
          <Input
            block
            name="email"
            type="email"
            label="Email"
            placeholder="exemplo@exemplo.com"
            onChange={this.handleChange}
          />
          <Input
            block
            name="password"
            type="password"
            label="Senha"
            placeholder="sua senha"
            onChange={this.handleChange}
          />
        </Form>
        <SubmitButton
          block
          disabled={this.props.loading}
          onClick={this.handleSubmit}
        >
          {this.props.submitText}
        </SubmitButton>
        <RenderIf expr={false}>
          <div>
            <SeparatorText>ou</SeparatorText>
            <FacebookButton block>Login com facebook</FacebookButton>
          </div>
        </RenderIf>
        <Footer>
          <RenderIf expr={false}>
            <ForgotPasswordText>Esqueci a senha</ForgotPasswordText>
          </RenderIf>
          <RenderIf expr={!this.props.isAdmin}>
            <Link prefetch href="/signup">
              <CreateAccountText>Criar nova conta</CreateAccountText>
            </Link>
          </RenderIf>
        </Footer>
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

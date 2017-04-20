import React, { Component, PropTypes } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { login } from '../../store/auth';
import Input from '../common/input';
import Button from '../common/button';
import { Text } from '../common/typography';
import RenderIf from '../common/render-if';
import { colors } from '../styles/variables';

const Submit = styled(Button)`
  margin-top: 32px;
  height: 44px;
  line-height: 24px;
  font-size: 14px;
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

  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { isAdmin } = this.props
    if (nextProps.isSignedIn) {
      // TODO: Alter this to redirect to the page where the user was before login
      // Probably using a ?reditectTo query param
      const url = isAdmin ? '/admin' : '/';
      Router.replace(url)
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    const { email, password } = this.state
    const { isAdmin } = this.props
    this.props.login(email, password, isAdmin)
  }

  handleChange ({ target }) {
    this.setState({ [target.name]: target.value })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <Submit
          block
          disabled={this.props.loading}
          onClick={this.handleSubmit}
        >
          {this.props.submitText}
        </Submit>
      </form>
    )
  }
}

export default connect(
  ({ auth, currentUser }) => ({
    loading: auth.login.loading,
    error: auth.login.error,
    isSignedIn: currentUser.token !== undefined
  }),
  { login }
)(LoginForm)

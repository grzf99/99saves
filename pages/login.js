import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import withStore from 'next-redux-wrapper';
import createStore from '../store';
import { colors } from '../components/styles/variables';
import LoginForm from '../components/auth/login-form';
import AuthPage from '../components/auth/auth-page';

const FormWrapper = styled.div`
  padding: 36px;
  background: ${colors.white};
`;

class Login extends Component {
  static async getInitialProps(ctx) {
    const { as, pathname, query } = ctx.query;

    return {
      as,
      pathname,
      query
    };
  }

  componentWillMount() {
    if (this.props.isSignedIn) {
      Router.replace('/saves');
    }
  }

  render() {
    return (
      <AuthPage>
        <FormWrapper>
          <LoginForm
            submitText="Login com email"
            as={this.props.as}
            pathname={this.props.pathname}
            query={this.props.query}
          />
        </FormWrapper>
      </AuthPage>
    );
  }
}

export default withStore(createStore, ({ currentUser }) => ({
  isSignedIn: currentUser.token !== undefined
}))(Login);

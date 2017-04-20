import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import withStore from 'next-redux-wrapper';
import createStore from '../../store';
import LoginForm from '../../components/auth/login-form'

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 400px;
  padding: 36px;
`;

class Login extends Component {
  componentWillMount () {
    if (this.props.isSignedIn) {
      Router.replace('/admin')
    }
  }

  render () {
    return (
      <Page>
        <Container>
          <LoginForm
            isAdmin
            submitText="Login"
          />
        </Container>
      </Page>
    );
  }
}

export default withStore(
  createStore,
  ({ currentUser }) => ({
    isSignedIn: currentUser.token !== undefined
  })
)(Login)

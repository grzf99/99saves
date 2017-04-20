import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import withStore from 'next-redux-wrapper';
import createStore from '../store';
import LoginModal from '../components/auth/login-modal';

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
  componentWillMount() {
    if (this.props.isSignedIn) {
      Router.replace('/');
    }
  }

  render() {
    return (
      <Page>
        <Container>
          <LoginModal
            isOpen
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
)(Login);

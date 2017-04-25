import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import withStore from 'next-redux-wrapper';
import createStore from '../../store';
import LoginForm from '../../components/auth/login-form';
import Page from '../../components/common/page';
import Container from '../../components/common/container';
import { colors } from '../../components/styles/variables';

const FormWrapper = styled.div`
  background: ${colors.white};
  padding: 36px;
`;

class Login extends Component {
  componentWillMount() {
    if (this.props.isSignedIn) {
      Router.replace('/admin');
    }
  }

  render() {
    return (
      <Page flex centered>
        <Container maxWidth="400px">
          <FormWrapper>
            <LoginForm isAdmin submitText="Login" />
          </FormWrapper>
        </Container>
      </Page>
    );
  }
}

export default withStore(createStore, ({ currentUser }) => ({
  isSignedIn: currentUser.token !== undefined
}))(Login);

import React, { Component } from 'react';
import Router from 'next/router';
import withStore from 'next-redux-wrapper';
import createStore from '../store';
import AuthPage from '../components/auth/auth-page';
import RenderIf from '../components/common/render-if';
import SignupStep1 from '../components/auth/signup-step-1';
import SignupStep2 from '../components/auth/signup-step-2';
import { signup, isEmailAvailable } from '../store/auth';

export class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      step: 1
    };
    this.handleStep1Submit = this.handleStep1Submit.bind(this);
    this.handleStep2Submit = this.handleStep2Submit.bind(this);
    this.handleStep2Back = this.handleStep2Back.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSignedIn) {
      // TODO: Alter this to redirect to the page where the user was before login
      // Probably using a ?reditectTo query param
      Router.replace('/saves');
    }

    if (nextProps.isUserAvailable && !nextProps.loading && this.props.loading) {
      this.setState({ step: 2 });
    }
  }

  handleStep1Submit(user) {
    this.props.isEmailAvailable(user.email);
    this.setState({ user });
  }

  handleStep2Submit(profile) {
    const { user } = this.state;
    this.props.signup({ ...user, profile });
  }

  handleStep2Back() {
    this.setState({ step: 1 });
  }

  render() {
    return (
      <AuthPage>
        <RenderIf expr={this.state.step === 1}>
          <SignupStep1
            onSubmit={this.handleStep1Submit}
            isUserAvailable={this.props.isUserAvailable}
          />
        </RenderIf>
        <RenderIf expr={this.state.step === 2}>
          <SignupStep2
            onSubmit={this.handleStep2Submit}
            onBack={this.handleStep2Back}
          />
        </RenderIf>
      </AuthPage>
    );
  }
}

export default withStore(
  createStore,
  ({ auth, currentUser }) => ({
    loading: auth.signup.loading,
    error: auth.signup.error,
    isSignedIn: currentUser.token !== undefined,
    isUserAvailable: auth.signup.isEmailAvailable
  }),
  { signup, isEmailAvailable }
)(SignupPage);

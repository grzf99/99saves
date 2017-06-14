import React, { Component } from 'react';
import Router from 'next/router';
import withStore from 'next-redux-wrapper';
import Cookies from 'js-cookie';
import createStore from '../../store';
import { noop } from '../../utils';
import createAPIClient from '../../utils/apiClient';
import { TOKEN_COOKIE_KEY, logout } from '../../store/auth';
import { setToken } from '../../store/currentUser';

export default function withApi(mapStateToProps = noop, mapDispatchToProps) {
  return (Page) => {
    class ApiComponent extends Component {
      static getInitialProps(ctx) {
        const api = createAPIClient();

        return (
          Page.getInitialProps &&
          Page.getInitialProps(Object.assign({}, ctx, { api }))
        );
      }

      constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
      }

      componentWillMount() {
        this.client = createAPIClient(this.props.token);
      }

      handleLogout() {
        this.props.logout();
        Router.push({ pathname: '/', query: { loggedOut: true } });
      }

      render() {
        return (
          <div>
            <Page
              {...this.props}
              api={this.client}
              onLogout={this.handleLogout}
            />
          </div>
        );
      }
    }

    return withStore(
      createStore,
      state => ({
        token: state.currentUser.token,
        isSignedIn: state.currentUser.token !== undefined,
        ...mapStateToProps(state)
      }),
      { logout, ...mapDispatchToProps }
    )(ApiComponent);
  };
}

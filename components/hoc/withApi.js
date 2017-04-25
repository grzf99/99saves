import React, { Component } from 'react';
import withStore from 'next-redux-wrapper';
import createStore from '../../store';
import { noop } from '../../utils';
import createAPIClient from '../../utils/apiClient';
import { TOKEN_COOKIE_KEY, logout } from '../../store/auth';
import { setToken } from '../../store/currentUser';
import Toast from '../common/toast'

export default function withApi(mapStateToProps = noop, mapDispatchToProps) {
  return (Page) => {
    class ApiComponent extends Component {
      static getInitialProps(ctx) {
        let token;
        if (ctx.req !== undefined) {
          token = ctx.req.cookies[TOKEN_COOKIE_KEY];
          ctx.store.dispatch(setToken(token));
        }

        const api = createAPIClient(token);
        return (
          Page.getInitialProps &&
          Page.getInitialProps(Object.assign({}, ctx, { api }))
        );
      }

      constructor(props) {
        super(props);
        this.state = {
          showToast: false
        }
        this.handleLogout = this.handleLogout.bind(this);
      }

      componentWillMount() {
        this.client = createAPIClient(this.props.token);
      }

      handleLogout() {
        this.props.logout();
        this.setState({ showToast: true });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      }

      render() {
        return (
          <div>
            <Page {...this.props} api={this.client} onLogout={this.handleLogout} />
            <Toast show={this.state.showToast}>Você foi deslogado com sucesso.</Toast>
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

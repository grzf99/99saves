import React, { Component } from 'react';
import withStore from 'next-redux-wrapper';
import createStore from '../../store';
import createAPIClient from '../../utils/apiClient';
import { TOKEN_COOKIE_KEY } from '../../store/auth';
import { setToken } from '../../store/currentUser';

export default function withApi(Page) {
  class ApiComponent extends Component {
    static getInitialProps (ctx) {
      let token
      if (ctx.req !== undefined) {
        token = ctx.req.cookies[TOKEN_COOKIE_KEY];
        ctx.store.dispatch(setToken(token));
      }

      const api = createAPIClient(ctx.store);
      return Page.getInitialProps && Page.getInitialProps(Object.assign({}, ctx, { api }));
    }

    componentWillMount () {
      this.client = createAPIClient(this.props.token)
    }

    render() {
      return (
        <Page
          {...this.props}
          api={this.client}
        />
      )
    }
  }

  return withStore(
    createStore,
    ({ currentUser }) => ({
      token: currentUser.token,
      isSignedIn: currentUser.token !== undefined
    })
  )(ApiComponent)
}

import React, { Component } from 'react';
import Router from 'next/router';
import withStore from 'next-redux-wrapper';
import RenderIf from '../common/render-if';
import createStore from '../../store';
import createAPIClient from '../../utils/apiClient';
import { TOKEN_COOKIE_KEY } from '../../store/auth';
import { setToken } from '../../store/currentUser';

export default function withAuth({ admin = false } = {}) {
  return (Page) => {
    class Authenticated extends Component {
      static getInitialProps(ctx) {
        let token;
        if (ctx.req !== undefined) {
          token = ctx.req.cookies[TOKEN_COOKIE_KEY];
          ctx.store.dispatch(setToken(token));
        }

        const api = createAPIClient(token);

        return Page.getInitialProps && Page.getInitialProps(Object.assign({}, ctx, { api }));
      }

      componentWillMount() {
        if (typeof window !== 'undefined' && !this.props.isSignedIn) {
          const url = admin ? '/admin/login' : '/login';
          Router.replace(url);
        }

        this.client = createAPIClient(this.props.token);
      }

      render() {
        return (
          <RenderIf expr={this.props.isSignedIn}>
            <Page
              {...this.props}
              api={this.client}
            />
          </RenderIf>
        );
      }
    }

    return withStore(
      createStore,
      ({ currentUser }) => ({
        token: currentUser.token,
        isSignedIn: currentUser.token !== undefined
      })
    )(Authenticated);
  };
}

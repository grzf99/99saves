import React from 'react';
import 'isomorphic-fetch';

import config from '../config';
import Toolbar from '../components/toolbar';
import Card from '../components/card';

export default class extends React.Component {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${config.API_URL}/saves`);
    const saves = await res.json();
    return { saves };
  }

  constructor(props) {
    super(props);

    this.state = { user: {}, logged: false };
    this.handleLoginClick = this.login.bind(this);
  }

  login() {
    FB.login((res) => {
      // eslint-disable-next-line no-undef
      fetch(`${config.API_URL}/auth/facebook?access_token=${res.authResponse.accessToken}`)
        .then(user => user.json())
        .then(({ user }) => {
          this.setState({ user, logged: true });
        });
    }, { scope: 'email' });
  }

  render() {
    // console.log();
    return (
      <div>
        <Toolbar login={this.handleLoginClick} logged={this.state.logged} />
        {
          this.props.saves.rows.map(save => <Card {...save} key={save.id} />)
        }
      </div>
    );
  }
}

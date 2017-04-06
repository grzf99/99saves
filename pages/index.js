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

  render() {
    // console.log();
    return (
      <div>
        <Toolbar />
        {
          this.props.saves.rows.map(save => <Card {...save} key={save.id} />)
        }
      </div>
    );
  }
}

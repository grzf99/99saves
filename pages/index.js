import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import 'isomorphic-fetch';

import config from '../config';

const Title = styled.h1`
  color: red;
  font-size: ${modularScale(1)};
`;

export default class extends React.Component {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${config.API_URL}/todos`);
    const json = await res.json();
    return { json };
  }

  render() {
    console.log(this.props.json);
    return (
      <div>
        <Title className="title">Hello World!</Title>
      </div>
    );
  }
}

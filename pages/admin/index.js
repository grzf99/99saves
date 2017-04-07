import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import 'isomorphic-fetch';

import config from '../../config';
import Layout from '../../components/admin/layout';

const Title = styled.h1`
  color: red;
  font-size: ${modularScale(1)};
`;

export default class extends React.Component {

  render() {
    console.log(this.props.json);
    return (
      <Layout>
        <Title className="title">Hello Admin!</Title>
      </Layout>
    );
  }
}

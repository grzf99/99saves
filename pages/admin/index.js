import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import 'isomorphic-fetch';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';

const Title = styled.h1`
  color: red;
  font-size: ${modularScale(1)};
`;

class Admin extends React.Component {
  render() {
    console.log(this.props.json);
    return (
      <Layout>
        <Title className="title">Hello Admin!</Title>
      </Layout>
    );
  }
}

export default withAuth({ admin: true })(Admin);

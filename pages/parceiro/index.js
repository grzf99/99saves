import React from 'react';
import styled from 'styled-components';

import config from '../../config';
import Layout from '../../components/parceiro/layout';

const Title = styled.h1`
  color: red;
`;

class Admin extends React.Component {
  render() {
    console.log(this.props.json);
    return (
      <Layout>
        <Title className="title">Hello Fornecedor!</Title>
      </Layout>
    );
  }
}

export default Admin;

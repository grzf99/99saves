import React from 'react';
import styled from 'styled-components';

import config from '../../config';
import Layout from '../../components/parceiro/layout';
import withAuth from '../../components/hoc/withAuth';

const Title = styled.h1`
  color: red;
`;

class Index extends React.Component {
  render() {
    console.log(this.props.json);
    return (
      <Title>Testando</Title>
    );
  }
}

export default withAuth({ isProviderPage: true })(Layout("Titulo", "Descrição")(Index));

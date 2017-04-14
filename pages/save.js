import React from 'react';

import config from '../config';
import Toolbar from '../components/toolbar';
import Page from '../components/common/page';
import Footer from '../components/footer';
import Container from '../components/common/container';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const save = await (await fetch(`${config.API_URL}/saves/${req.query.offer}`)).json();
    return { save };
  }

  constructor(props) {
    super(props);

    console.log(props.save);
  }

  render() {
    console.log(this.props.save)
    return (
      <Page>
        <Toolbar />

        <Container>
          <h1>Teste</h1>
        </Container>

        <Footer />
      </Page>
    );
  }
}

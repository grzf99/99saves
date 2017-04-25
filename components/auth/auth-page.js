import React from 'react';
import styled from 'styled-components';
import Page from '../common/page';
import Container from '../common/container';
import Footer from '../footer';
import { Logo } from '../common/svg';

const Header = styled.div`
  padding: 56px 0;
  text-align: center;
`;

const LocalLogo = styled(Logo)`
  height: 50px;
  width: 184.6px;
`;

export default ({ children }) => (
  <Page
    hasFooter
    flex
    centered
    backgroundImage="static/images/signup-background@2x.jpg"
  >
    <Container maxWidth="400px">
      <Header>
        <LocalLogo />
      </Header>
      {children}
    </Container>
    <Footer />
  </Page>
);

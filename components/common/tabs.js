import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/variables';
import Container from './container';

const Tabs = styled.div`
  background: ${colors.black};
  display: flex;
  width: 100%;

  @media (min-width: 960px) {
    border-bottom: 1px solid ${colors.green};

    > * {
      max-width: 240px;
    }
  }
`;

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { index: props.index || 0 };

    this.labels = this.labels.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  componentWillReceiveProps({ index }) {
    if (this.state.index !== index) {
      this.setState({ index });
    }
  }

  handleChangeIndex(index) {
    this.setState({ index });
    this.props.onChange(index);
  }

  labels(child, index) {
    return (
      React.cloneElement(child, {
        key: index,
        onClick: () => this.handleChangeIndex(index),
        active: index === this.state.index
      })
    );
  }

  render() {
    return (
      <Container>
        <Tabs>
          {this.props.children.map(this.labels)}
        </Tabs>
      </Container>
    );
  }
}

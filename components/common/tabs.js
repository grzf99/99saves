import React from 'react';
import styled from 'styled-components';
import Container from './container';
import { colors } from '../styles/variables';

const Tabs = styled.div`
  border-bottom: ${props => props.withBorder ? `1px solid ${colors.darkBlue}` : '0'};
  display: flex;
  width: 100%;

  @media (min-width: 640px) {
    > * {
      max-width: 200px;
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
        <Tabs {...this.props}>
          {this.props.children.map(this.labels)}
        </Tabs>
      </Container>
    );
  }
}

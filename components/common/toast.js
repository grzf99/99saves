import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/variables';

const Container = styled.div`
  background: ${colors.blue};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  color: ${colors.white};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  position: fixed;
  top: 12px;
  left: 12px;
  right: 12px;
  padding: 12px 24px;
  transform: translateY(${props => (props.show ? '55px' : '-155px')});
  transition: .3s ease transform;

  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 640px;
    text-align: center;
  }
`;

class Toast extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onFade: PropTypes.func,
    timer: PropTypes.number
  }

  static defaultProps = {
    show: false,
    onFade: () => {},
    timer: 1500
  }
  render() {
    const { show, onFade, timer } = this.props;

    if (show) {
      setTimeout(() => onFade(), timer);
    }
    return (
      <Container {...this.props}>{this.props.children}</Container>
    );
  }
}

export default Toast;

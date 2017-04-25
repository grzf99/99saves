import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';
import { colors } from '../styles/variables';
import { Text } from './typography';

const Container = styled.div`
  width: ${props => (props.block ? '100%' : 'auto')};
  padding: 6px 0;
`;

const Label = styled(Text)`
  color: ${colors.green};
  line-height: 16px;
  font-weight: 500;
  display: block;
`;

const [r, g, b] = hexRgb(colors.black);
const Field = styled.input`
  border: 0;
  border-bottom: 1px solid ${colors.black};
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  display: block;
  line-height: 1.5;
  outline: none;
  width: 100%;
  &::placeholder {
    color: rgba(${r}, ${g}, ${b}, 0.12);
  }
`;

const Hint = styled(Text)`
  display: block;
  color: ${colors.lightgray};
  padding-top: 5px;
`;

class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    block: PropTypes.bool
  };

  static defaultProps = {
    label: '',
    block: false
  };

  render() {
    const { onChange, value, label, hint, block, ...rest } = this.props;
    return (
      <Container block={block}>
        <Label uppercase>{label}</Label>
        <Field onChange={onChange} value={value} {...rest} />
        <Hint>{hint}</Hint>
      </Container>
    );
  }
}

export default Input;

import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';
import MaskedInput from 'react-input-mask';
import { colors } from '../styles/variables';
import { Text } from './typography';
import validatable from '../hoc/validatable';

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
export const Field = styled.input`
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

export const MaskedField = styled(MaskedInput)`
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
  color: ${props => (props.red ? colors.red : colors.lightgray)};
  padding-top: 5px;
`;

export class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    block: PropTypes.bool,
    mask: PropTypes.string,
    value: PropTypes.string,
    valid: PropTypes.bool,
    validationMessage: PropTypes.string
  };

  static defaultProps = {
    label: '',
    block: false,
    mask: undefined,
    validationMessage: '',
    valid: true,
    value: ''
  };

  hasMask() {
    return this.props.mask !== undefined && this.props.mask !== '';
  }

  render() {
    const {
      label,
      hint,
      block,
      mask,
      value,
      valid,
      validationMessage,
      onChange,
      ...cleanedProps
    } = this.props;
    return (
      <Container block={block}>
        <Label uppercase>{label}</Label>
        {!this.hasMask()
          ? <Field {...cleanedProps} value={value} onChange={onChange} />
          : <MaskedField
            {...cleanedProps}
            mask={mask}
            value={value}
            onChange={onChange}
          />}
        <Hint red={!valid}>{valid ? hint : validationMessage}</Hint>
      </Container>
    );
  }
}

export default validatable(Input);

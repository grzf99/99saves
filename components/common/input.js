import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';
import MaskedInput from 'react-maskedinput';
import { colors } from '../styles/variables';
import { Text } from './typography';
import { noop } from '../../utils';

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

class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    block: PropTypes.bool,
    validation: PropTypes.func,
    mask: PropTypes.string
  };

  static defaultProps = {
    label: '',
    block: false,
    validation: noop,
    mask: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      dirty: false,
      validationMessage: '',
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    let valid = this.state.valid;
    this.setState({ dirty: true, value: target.value });

    if (this.props.validation && this.state.dirty) {
      const validationMessage = this.props.validation(target.value);
      valid = !validationMessage;
      this.setState({ valid, validationMessage });
    }

    this.props.onChange({
      target: {
        name: target.name,
        value: valid ? target.value : ''
      }
    });
  }

  hasMask() {
    return this.props.mask === undefined || this.props.mask === '';
  }

  render() {
    const { label, hint, block, mask, validation, ...rest } = this.props;
    const { value, valid, validationMessage } = this.state;
    return (
      <Container block={block}>
        <Label uppercase>{label}</Label>
        {this.hasMask()
          ? <Field {...rest} value={value} onChange={this.handleChange} />
          : <MaskedField
            {...rest}
            mask={mask}
            value={value}
            onChange={this.handleChange}
          />}
        <Hint red={!valid}>{valid ? hint : validationMessage}</Hint>
      </Container>
    );
  }
}

export default Input;

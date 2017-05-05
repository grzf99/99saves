import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb';
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

const FieldWrapper = styled.div`
  border-bottom: 1px solid ${colors.black};
`;

const [r, g, b] = hexRgb(colors.black);
export const Field = styled.select`
  border: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  display: block;
  line-height: 1.5;
  outline: none;
  width: 100%;
  background: transparent;
  min-height: 27px;
  &::placeholder {
    color: rgba(${r}, ${g}, ${b}, 0.12);
  }
`;

const Hint = styled(Text)`
  display: block;
  color: ${props => (props.red ? colors.red : colors.lightgray)};
  padding-top: 5px;
`;

class Select extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    block: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
      })
    ).isRequired,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    valid: PropTypes.bool,
    validationMessage: PropTypes.string
  };

  static defaultProps = {
    label: '',
    block: false,
    defaultOption: 'Selecione o registro',
    validationMessage: '',
    valid: true,
    value: ''
  };

  get options() {
    return [
      { value: '', label: this.props.defaultOption },
      ...this.props.options
    ];
  }

  render() {
    const {
      label,
      hint,
      block,
      value,
      valid,
      validationMessage,
      onChange,
      ...cleanedProps
    } = this.props;

    return (
      <Container block={block}>
        <Label uppercase>{label}</Label>
        <FieldWrapper>
          <Field {...cleanedProps} onChange={onChange} value={value}>
            {this.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
        </FieldWrapper>
        <Hint red={!valid}>{valid ? hint : validationMessage}</Hint>
      </Container>
    );
  }
}

export default validatable(Select);

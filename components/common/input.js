import React, { PropTypes } from 'react';
import styled from 'styled-components';
import hexRgb from 'hex-rgb'
import { colors } from '../styles/variables';

const Container = styled.div`
  height: 48px;
  width: ${props => props.block ? '100%' : 'auto'};
`;

const Label = styled.span`
  color: ${colors.green};
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
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
`

const Input = ({ onChange, value, label, block, ...rest }) => (
  <Container block={block}>
    <Label>{label}</Label>
    <Field
      onChange={onChange}
      value={value}
      {...rest}
    />
  </Container>
);

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  label: PropTypes.string,
  block: PropTypes.bool
};

export default Input;

import styled, { css } from 'styled-components';
import { colors } from '../styles/variables';

const outlineStyles = css`
  background-color: transparent;
  border: solid 1px ${colors.green};

  &:hover {
    background-color: ${colors.green};
  }
`;

const smallStyles = css`
  font-size: 14px;
  line-height: 28px;
  padding: 0 10px;
  text-transform: lowercase;
`;

const largeStyles = css`
  font-size: 16px;
  padding: 12px 28px;
`;

const blockStyles = css`
  display: block;
  font-weight: 500;
  padding: 10px;
`;

const disabledStyles = css`
  background-color: ${colors.darkGreen};
  color: ${colors.gray};
  cursor: default;

  &:hover {
    background-color: ${colors.darkGreen};
  }
`;

const Button = styled.a`
  background-color: ${colors.green};
  border-radius: 2px;
  color: ${colors.white};
  display: inline-block;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 12px;
  padding: 10px 24px;
  text-align: center;
  text-transform: uppercase;

  &:hover {
    background-color: ${colors.alternateGreen};
    transition: .2s ease background-color;
  }

  ${props => props.block ? blockStyles : ''}
  ${props => props.small ? smallStyles : ''}
  ${props => props.large ? largeStyles : ''}
  ${props => props.outline ? outlineStyles : ''}
  ${props => props.disabled ? disabledStyles : ''}
`;

export default Button;

import styled, { css } from 'styled-components';
import { colors } from '../styles/variables';

const outlineStyles = css`
  background: transparent;
  border: solid 1px ${colors.green};
`;

const smallStyles = css`
  font-size: 14px;
  line-height: 28px;
  padding: 0 10px;
  text-transform: lowercase;
`;

const blockStyles = css`
  display: block;
  font-weight: 500;
  padding: 10px 24px;
`;

const disabledStyles = css`
  background: ${colors.darkGreen};
  color: ${colors.gray};
`;

const Button = styled.a`
  background: ${colors.green};
  border-radius: 2px;
  color: ${colors.white};
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;

  ${props => props.block ? blockStyles : ''}
  ${props => props.small ? smallStyles : ''}
  ${props => props.outline ? outlineStyles : ''}
  ${props => props.disabled ? disabledStyles: ''}
`;

export default Button;

import styled from 'styled-components';
import Button from './button';
import { colors } from '../styles/variables';

export default styled(Button)`
  height: 44px;
  line-height: 24px;
  font-size: 14px;

  ${props => props.disabled && `background-color: rgba(40,186,100, .2);`}
  ${props => props.disabled && `color: rgba(255, 255, 255, .9);`}

  &:hover {
    ${props => props.disabled && `background-color: rgba(40,186,100, .2);`}
    ${props => props.disabled && `color: rgba(255, 255, 255, .9);`}
  }
`;

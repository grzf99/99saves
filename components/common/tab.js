import styled from 'styled-components';
import { colors } from '../styles/variables';

const Tab = styled.a`
  color: ${props => props.active ? colors.white : colors.lightgray};
  flex-grow: 1;
  flex-basis: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  line-height: 48px;
  text-align: center;
  text-transform: uppercase;

  ${props => props.active && `border-bottom: 4px solid ${colors.green}`}
`;

export default Tab;

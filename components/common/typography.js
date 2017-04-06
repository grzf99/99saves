import styled from 'styled-components';
import { colors } from '../styles/variables';

export const Heading = styled.h1`
  color: ${props => props.white ? colors.white : colors.black};
  font-family: 'Oswald', sans-serif;
  font-size: ${props => props.large ? '34px' : '26px'};
  font-weight: ${props => props.large ? '700' : '500'};;
  margin: 0;
  ${props => props.uppercase && 'text-transform: uppercase'};
`;

export const Text = styled.p`
  color: ${props => props.white ? colors.white : colors.black};
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  margin: 0;
`;

export const SmallText = styled.p`
  color: ${colors.white};
  font-family: 'Roboto', sans-serif;
  font-size: 8px;
  margin: 0;
`;

export default {
  Heading,
  Text,
  SmallText
};

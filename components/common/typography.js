import styled from 'styled-components';
import { colors } from '../styles/variables';

export const Heading = styled.h1`
  color: ${colors.white};
  font-family: 'Oswald', sans-serif;
  font-size: 26px;
  font-weight: 500;
  margin: 0;
`;

export const Paragraph = styled.p`
  color: ${props => props.small ? colors.white : colors.lightgray};
  font-family: 'Roboto', sans-serif;
  font-size: ${props => props.small ? '8px' : '12px'};
  margin: 0;
`;

export default {
  Heading,
  Paragraph
};

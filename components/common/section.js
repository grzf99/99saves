import styled from 'styled-components';
import { colors } from '../styles/variables';

const Section = styled.section`
  width: 100%;

  ${props => props.gray && `background: ${colors.alternateWhite}`}
  ${props => props.white && `background: ${colors.white}`}
`;

export default Section;

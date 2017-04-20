import styled from 'styled-components';
import { colors } from '../styles/variables';
import Container from './container';

const Headline = styled.div`
  background-color: ${props => props.spotlight ? colors.blue : colors.alternateWhite};
  color: ${props => props.spotlight ? colors.white : colors.black};
  font-family: 'Oswald', sans-serif;
  font-size: ${props => props.spotlight ? '22px' : '16px'};
  line-height: ${props => props.spotlight ? '48px' : '32px'};
  margin: ${props => props.spotlight ? '0' : '20px 0'};
  text-align: center;

  ${props => !props.spotlight && 'display: none;'}

  @media (min-width: 640px) {
    display: block;
  }
`;

export default props => (
  <Headline {...props}>
    <Container>
      {props.children}
    </Container>
  </Headline>
);

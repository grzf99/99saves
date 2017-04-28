import styled, { css } from 'styled-components';
import { colors } from '../styles/variables';
import Container from './container';

const withRoboto = css`
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 28px;
    margin: 20px 0;
`;

const disabled = css`
  background-color: ${colors.gray};
  color: ${colors.white};
`;

const spotlight = css`
  background-color: ${colors.blue};
  color: ${colors.white};
  margin: 0;
`;

const Headline = styled.div`
  background-color: ${colors.alternateWhite};
  color: ${colors.black};
  font-family: 'Oswald', sans-serif;
  font-size: ${props => props.large ? '22px' : '16px'};
  line-height: ${props => props.large ? '48px' : '32px'};
  margin: 20px 0;
  text-align: center;
  ${props => props.uppercase && 'text-transform: uppercase'};

  ${props => !props.spotlight && 'display: none;'}
  ${props => props.withRoboto ? withRoboto : ''}
  ${props => props.disabled ? disabled : ''}
  ${props => props.spotlight ? spotlight : ''}

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

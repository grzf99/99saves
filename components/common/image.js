import styled from 'styled-components';

export default styled.img`
  max-height: ${props => props.size ? props.size : '100%'};
  width: auto;
  @media (max-width: 480px) {
    max-width: ${props => props.size ? props.size : '100%'};
    width: auto;
    height: auto;
  }
`;

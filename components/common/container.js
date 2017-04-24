import styled from 'styled-components';

export default styled.div`
  max-width: ${props => (props.maxWidth ? props.maxWidth : '960px')};
  margin: 0 auto;
  width: 100%;
`;

import styled from 'styled-components';

export const Row = styled.section`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    position: relative;
    display: inline-table;
  }
`;

export const Column = styled.div`
  flex: ${props => props.third ? '0 0 33%' : '1'};
  @media (max-width: 480px) {
    position: ${props => props.third ? 'absolute' : 'relative'};
    top: ${props => props.third ? '0' : 'auto'};
    padding-top: ${props => props.third ? '0' : '380px'};
    margin: 0 10px;
  }
`;

export default {
  Row,
  Column
};

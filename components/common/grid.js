import styled from 'styled-components';

export const Row = styled.section`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  flex: ${props => props.third ? '0 0 33%' : '1'};
`;

export default {
  Row,
  Column
};

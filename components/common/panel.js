import styled from 'styled-components';
import { colors } from '../styles/variables';

const Panel = styled.div`
  background: ${colors.white};
  color: ${colors.black};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 1.29;
  margin: 20px 0;
  padding: 15px 30px;

  h3 {
    color: ${colors.lightgray};
    font-size: 12px;
    line-height: 2;
    margin: 0;
    text-transform: uppercase;
  }
`;

export default Panel;

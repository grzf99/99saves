import styled from 'styled-components';
import { colors } from '../styles/variables';

const Toast = styled.div`
  background: ${colors.blue};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  color: ${colors.white};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  position: fixed;
  top: 12px;
  left: 12px;
  right: 12px;
  padding: 12px 24px;
  transform: translateY(${props => props.show ? '54px' : '-55px'});
  transition: .3s ease transform;

  @media (min-width: 480px) {
    margin: 0 auto;
    max-width: 640px;
    text-align: center;
  }
`;

export default props => <Toast {...props}>{props.children}</Toast>;

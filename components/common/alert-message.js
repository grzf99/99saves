import styled, { css } from 'styled-components';
import { colors } from '../styles/variables';

const warningStyle = css`
  background: ${colors.red};
`;

const successStyle = css`
  background: ${colors.green};
`;

const AlertMessage = styled.div`
  background: ${colors.black};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  color: ${colors.white};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  position: fixed;
  bottom: 12px;
  left: 12px;
  right: 12px;
  padding: 12px 24px;
  transform: translateY(${props => props.show ? '0' : 'calc(100% + 12px)'});
  transition: .3s ease transform;

  ${props => props.type === 'warning' ? warningStyle : ''}
  ${props => props.type === 'success' ? successStyle : ''}
`;

export default AlertMessage;

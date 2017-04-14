import styled from 'styled-components';

import { colors } from '../styles/variables';

export default styled.div`
  background: ${colors.black};
  min-height: 100vh;
  position: relative;
  width: 100%;

  ${props => props.hasFooter && 'padding-bottom: 98px'};
`;

import styled from 'styled-components';

import { colors } from '../styles/variables';

export default styled.div`
  background: ${colors.black};
  min-height: 100vh;
  position: relative;
  width: 100%;
  ${props => props.paddingBottom && 'padding-bottom: 20px'};
  ${props => props.flex && 'display: flex'};
  ${props => props.centered && `
    align-items: center;
    justify-content: center;
  `}
  ${props => props.backgroundImage && `
    background-image: url(${props.backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
  `}
`;

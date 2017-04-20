import styled from 'styled-components';
import { lighten } from 'polished';
import { colors } from '../styles/variables';
import Button from './button';

export default styled(Button)`
  background-color: ${colors.facebookBlue};
  background-image: url(/static/images/bt-facebook.svg);
  background-position: 18px 12px;
  background-repeat: no-repeat;
  font-size: 14px;
  font-weight: 500;
  padding-left: 40px;
  height: 44px;
  line-height: 24px;
  text-transform: uppercase;

  &:hover {
    background-color: ${lighten(0.1, colors.facebookBlue)};
  }
`;

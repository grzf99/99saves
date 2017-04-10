import styled from 'styled-components';
import { colors } from './styles/variables';
import Button from './common/button';

const Toolbar = styled.header`
  background: ${colors.black};
  display: flex;
  justify-content: space-between;
  padding: 11px;
  width: 100%;
  height: 52px;
`;

const Logo = styled.img`
  margin-left: 5px;
`;

export default props => (
  <Toolbar>
    <Logo src="/static/images/logo-99-saves.svg" alt="99saves" />
    {
      !props.logged && <Button small outline onClick={props.login}>login</Button>
    }
  </Toolbar>
);

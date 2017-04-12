import styled from 'styled-components';
import { colors } from './styles/variables';
import Button from './common/button';
import Container from './common/container';

const Toolbar = styled.header`
  background: ${colors.black};
  width: 100%;
`;

const CustomContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 11px;
  height: 52px;
`;

const Logo = styled.img`
  margin-left: 5px;
`;

export default props => (
  <Toolbar>
    <CustomContainer>
      <Logo src="/static/images/logo-99-saves.svg" alt="99saves" />
      {
        !props.logged && <Button small outline onClick={props.login}>login</Button>
      }
    </CustomContainer>
  </Toolbar>
);

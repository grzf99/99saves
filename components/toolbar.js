import styled from 'styled-components';
import Link from 'next/link';
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
  padding: 12px;
`;

const Logo = styled.img`
  margin-left: 5px;
`;

export default props => (
  <Toolbar>
    <CustomContainer>
      <Link prefetch href="/">
        <a><Logo src="/static/images/logo-99-saves.svg" alt="99saves" /></a>
      </Link>
      {
        !props.logged && <Button small outline onClick={props.login}>login</Button>
      }
    </CustomContainer>
  </Toolbar>
);

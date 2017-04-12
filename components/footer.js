import styled from 'styled-components';
import { colors } from './styles/variables';
import { Text } from './common/typography';

const Footer = styled.footer`
  align-items: center;
  background: ${colors.black};
  bottom: 0;
  box-shadow: inset 0 1px 0 0 ${colors.darkBlue};
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
`;

const CustomText = styled(Text)`
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  margin-left: 20px;
`;

const SocialMedia = styled.div`
  align-items: center;
  background: ${colors.white};
  display: flex;
  justify-content: space-between;
  padding: 25px;
  max-width: 220px;
  width: 100%;
`;

export default props => (
  <Footer {...props}>
    <CustomText white>
      &reg;
      2017 | Todos os direitos reservados
    </CustomText>
    <SocialMedia>
      <a href="https://www.facebook.com/99saves/">
        <img src="/static/images/post-facebook.svg" alt="Página no Facebook" />
      </a>
      <a href="/">
        <img src="/static/images/post-twitter.svg" alt="Página no Twitter" />
      </a>
      <a href="/">
        <img src="/static/images/post-instagram.svg" alt="Página no Instagram" />
      </a>
    </SocialMedia>
  </Footer>
);

import styled from 'styled-components';
import { colors } from './styles/variables';
import { Text } from './common/typography';
import { Facebook, Instagram, Youtube, Linkedin, Medium } from './common/svg';

const Footer = styled.footer`
  align-items: center;
  background: ${colors.darkGrey};
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const CustomText = styled(Text)`
  font-family: 'Oswald', sans-serif;
  font-size: 12px;
  padding: 0 20px;

  @media (min-width: 640px) {
    font-size: 16px;
  }
`;

const SocialMedia = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 25px;
  max-width: 250px;
  width: 100%;

  > a svg path {
    fill: ${colors.white};
  }

  > a:hover svg path {
    fill: ${colors.green};
    transition: .2s ease fill;
  }
`;

const TextLinks = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.black};
  border-bottom: 1px solid ${colors.black};
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  max-width: 960px;
  padding: 25px 0;
  width: 100%;
`;

export default props => (
  <Footer {...props}>
    <SocialMedia>
      <a href="https://medium.com/@99saves">
        <Medium />
      </a>
      <a href="https://www.facebook.com/99saves/">
        <Facebook />
      </a>
      <a href="https://www.youtube.com/channel/UCVaiNqY6WhW9PqJeUbaLwbw">
        <Youtube />
      </a>
      <a href="https://www.instagram.com/99saves/">
        <Instagram />
      </a>
      <a href="https://www.linkedin.com/company-beta/16232043/">
        <Linkedin />
      </a>
    </SocialMedia>
    <TextLinks>
      <CustomText white>
        &reg;
        2017 | Todos os direitos reservados
      </CustomText>
    </TextLinks>
  </Footer>
);

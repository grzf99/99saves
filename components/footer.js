import styled from 'styled-components';
import Link from 'next/link';
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

  ${props => props.marginTop && 'margin-top: 80px;'};
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
  align-items: flex-start;
  border-top: 1px solid ${colors.black};
  border-bottom: 1px solid ${colors.black};
  display: flex;
  font-family: 'Roboto';
  justify-content: center;
  margin-bottom: 20px;
  max-width: 960px;
  padding: 25px 0;
  width: 100%;

  div:first-child {
    margin-left: 45px;
    padding-right: 40px;
    position: relative;

    &:after {
      border-right: 1px solid ${colors.black};
      content: '';
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
    }

    @media (max-width: 480px) {
      margin-left: 25px;
    }
  }

  > div:nth-last-child(1) {
    padding-left: 40px;
  }
`;

const FooterTexts = styled.div`
  color: ${colors.gray};
  font-family: 'Roboto';
  font-size: 12px;
  text-align: right;

  > * {
    max-width: 300px;
  }

  a {
    color: ${colors.gray};

    &:hover
    {
      text-decoration: underline;
    }
  }
`;

const FooterTitle = styled.h3`
  color: ${colors.white};
  font-family: Oswald;
  font-size: 22px;
  margin-top: 0;
`;

const FooterText = styled.p`
  font-size: 12px;
`;

const FooterLinks = styled.div`
  text-align: left;
`;

const FooterLink = styled.div`

  > a:first-child {
    margin-top: 0;
  }

  > a {
    color: ${colors.green};
    font-family: 'Roboto';
    float: left;
    font-size: 14px;
    margin: 3px;
    width: 100%;
  }
`;

const FooterLogo = styled.img`
  align-self: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

export default props => (
  <Footer {...props}>
    <SocialMedia>
      <a href="https://journal.99saves.com" target="_blank">
        <Medium />
      </a>
      <a href="https://www.facebook.com/99saves/" target="_blank">
        <Facebook />
      </a>
      <a href="https://www.youtube.com/channel/UCVaiNqY6WhW9PqJeUbaLwbw" target="_blank">
        <Youtube />
      </a>
      <a href="https://www.instagram.com/99saves/" target="_blank">
        <Instagram />
      </a>
      <a href="https://www.linkedin.com/company-beta/16232043/" target="_blank">
        <Linkedin />
      </a>
    </SocialMedia>
    <TextLinks>
      <FooterTexts>
        <FooterTitle>99saves.com</FooterTitle>
        <FooterText>
          A 1ª plataforma de negociação direta entre consumidores e fabricantes
        </FooterText>
        <FooterText>
          <small>&reg; 2017 | Todos os direitos reservados</small>
        </FooterText>
        <FooterText>
          <small>Fale conosco<br/><a href="mailto:atendimento@99saves.com" target="_blank">atendimento@99saves.com</a></small>
        </FooterText>
      </FooterTexts>

      <FooterLinks>
        <FooterTitle>Links</FooterTitle>
        <FooterLink>
          <a href="https://journal.99saves.com/o-que-%C3%A9-o-99saves-com-ea9fbc2f8dc4" target="_blank">
            Quem Somos
          </a>
          <Link prefetch href="/saves">
            <a>Todos os saves</a>
          </Link>
          <Link prefetch href="/politica-privacidade">
            <a>Política de privacidade</a>
          </Link>
          <Link prefetch href="/termos-de-uso">
            <a>Termos de uso</a>
          </Link>
          <Link prefetch href="/faq">
            <a>FAQ</a>
          </Link>
        </FooterLink>
      </FooterLinks>
    </TextLinks>
    <Link prefetch href="/">
      <FooterLogo src="/static/images/logo-99-saves.svg" alt="99saves"  />
    </Link>

  </Footer>
);

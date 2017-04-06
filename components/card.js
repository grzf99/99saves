import styled from 'styled-components';
import { colors } from './styles/variables';
import Button from './common/button';
import Image from './common/image';
import { Heading, Paragraph } from './common/typography';

const Card = styled.div`
  background: ${colors.black};
  min-height: 350px;
  padding-bottom: 24px;
  text-align: center;
`;

const Header = styled.div`
  background: ${colors.white};
  padding-top: 24px;
  min-height: 258px;
`;

const Gradient = styled.div`
  background-image: linear-gradient(to bottom, rgba(29, 32, 40, 0.0), ${colors.black});
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 80px;
  width: 100%;
`;

const Info = styled.div`
  padding: 0 16px;

  > * + * {
    margin-top: 16px;
  }
`;

export default (props) => (
  <Card>
    <Header>
      <Image src={props.image_default} alt={props.title} />
      <Gradient>
        <Paragraph small>imagem meramente ilustrativa</Paragraph>
        <Heading>{props.title}</Heading>
      </Gradient>
    </Header>
    <Info>
      <Paragraph>{props.description}</Paragraph>
      <Button block>Negocie isto pra mim</Button>
    </Info>
  </Card>
);

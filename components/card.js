import React from 'react';
import styled from 'styled-components';
import { colors } from './styles/variables';
import Button from './common/button';
import Image from './common/image';
import { Heading, Text, SmallText } from './common/typography';

const Card = styled.div`
  background: ${colors.black};
  padding-bottom: 24px;
  text-align: center;
`;

const Header = styled.div`
  background: ${colors.white};
  padding-top: 24px;
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

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    if (!this.props.logged) this.props.openLoginModal();
  }

  render() {
    return (
      <Card>
        <Header>
          <Image src={this.props.image_default} alt={this.props.title} />
          <Gradient>
            <SmallText>imagem meramente ilustrativa</SmallText>
            <Heading white>{this.props.title}</Heading>
          </Gradient>
        </Header>
        <Info>
          <Text white>{this.props.description}</Text>
          <Button block onClick={this.handleSave}>Negocie isto pra mim</Button>
        </Info>
      </Card>
    );
  }
}

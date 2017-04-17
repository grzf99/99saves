import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { colors } from './styles/variables';
import Button from './common/button';
import Image from './common/image';
import { Heading, Text, SmallText } from './common/typography';

const Card = styled.div`
  background: ${colors.black};
  border: 1px solid ${rgba(255, 255, 255, 0.1)};
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-between;
  min-height: 333px;
  padding-bottom: 24px;
  text-align: center;
  width: 100%;
`;

const CardImage = styled(Image)`
  align-self: center;
`;

const Header = styled.div`
  background: ${colors.white};
  display: flex;
  height: 250px;
  justify-content: center;
  padding-top: 24px;
  position: relative;
`;

const Gradient = styled.div`
  background-image: linear-gradient(to bottom, rgba(29, 32, 40, 0.0), ${colors.black});
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 80px;
  position: absolute;
  width: 100%;

  > * {
    transform: translateY(20px);
  }
`;

const Info = styled.div`
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;

  > * + * {
    margin-top: 16px;
  }
`;

const CustomText = styled(Text)`
  color: ${colors.lightgray};
`;

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    this.goToOffers = this.goToOffers.bind(this);
  }

  handleSave() {
    if (!this.props.logged) this.props.openLoginModal();
    else !this.props.hasSubscribed && this.props.handleSubscribe();
  }

  goToOffers() {
    this.props.goToOffers();
  }

  renderButton() {
    let button = <Button block onClick={this.handleSave}>Negocie isto pra mim</Button>;
    if (this.props.hasSubscribed) {
      button = (
        this.props.Products &&
        this.props.Products.length &&
        (new Date(this.props.date_end).getTime() + (48 * 60 * 60 * 1000)) < Date.now()
      )
        ? <Button block onClick={this.goToOffers}>Participar da votação</Button>
        : <Button block disabled onClick={this.handleSave}>Acompanhando esta negociação</Button>;
    }
    return button;
  }

  render() {
    return (
      <Card {...this.props}>
        <Header>
          <CardImage src={this.props.image_default} alt={this.props.title} />
          <Gradient>
            <SmallText>imagem meramente ilustrativa</SmallText>
            <Heading white>{this.props.title}</Heading>
          </Gradient>
        </Header>
        <Info>
          <CustomText>{this.props.description}</CustomText>
          { this.renderButton() }
        </Info>
      </Card>
    );
  }
}

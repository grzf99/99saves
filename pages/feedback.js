import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import withAuth from '../components/hoc/withAuth';
import AuthPage from '../components/auth/auth-page';
import { Heading, Heading2, Text } from '../components/common/typography';
import Button from '../components/common/button';
import RenderIf from '../components/common/render-if';
import { Star } from '../components/common/svg';
import { colors } from '../components/styles/variables';

const Container = styled.div`
  width: 400px;
  background: #fff;
  padding: 35px;
`;

const Header = styled.div`
  padding-bottom: 23px;
  ${props => (props.centered ? 'text-align: center;' : '')}
`;

const Content = styled.div`
  display: flex;
  padding-bottom: 35px;
  ${props => (props.centered ? 'justify-content: center;' : '')}
`;

const Paragraph = styled(Text)`
  font-size: 14px;
`;

const StarContainer = styled.div`
  padding: 0 5px;
`;

const OutlineStar = styled(Star)`
  cursor: pointer;

  & path {
    fill: transparent;
    stroke-width: 0.5px;
    stroke: ${colors.black};

    ${props => (props.selected ? `
      fill: ${colors.green};
      stroke-width: 0;
    ` : '')}

    &:hover {
      fill: ${colors.green};
      stroke-width: 0;
    }
  }
`;

class FeedbackPage extends Component {
  static async getInitialProps(ctx) {
    const { saveId } = ctx.query;
    let subscription;
    try {
      subscription = (await ctx.api.get(`/saves/${saveId}/my-subscription`))
        .data;
    } catch (e) {}

    return { subscription };
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      loading: false,
      rate: props.url.query.rate
    };

    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  handleStarMouseEnter(position) {
    return () => this.setState({ hoveredPostion: position });
  }

  handleStartMouseLeave() {
    return () => this.setState({ hoveredPostion: undefined });
  }

  handleStarClick(position) {
    return () => this.setState({ rate: position });
  }

  handleConfirmClick() {
    const { id } = this.props.subscription;
    const { rate } = this.state;
    this.setState({ loading: true });
    this.props.api.put(`/subscriptions/${id}`, { rate }).then(() => {
      this.setState({ step: 2, loading: false });
    });
  }

  shouldSelectStar(position) {
    const { hoveredPostion, rate } = this.state;
    if (hoveredPostion !== undefined) {
      return hoveredPostion >= position;
    }

    return rate >= position;
  }

  shouldRenderRateForm() {
    const { subscription } = this.props;
    return (
      subscription === undefined ||
      (subscription !== undefined && subscription.rate === null)
    );
  }

  renderStep1() {
    return (
      <div>
        <Header centered>
          <Heading uppercase>Avalie sua compra</Heading>
        </Header>
        <Content centered>
          <StarContainer
            onMouseEnter={this.handleStarMouseEnter(1)}
            onMouseLeave={this.handleStartMouseLeave(1)}
            onClick={this.handleStarClick(1)}
          >
            <OutlineStar selected={this.shouldSelectStar(1)} />
          </StarContainer>
          <StarContainer
            onMouseEnter={this.handleStarMouseEnter(2)}
            onMouseLeave={this.handleStartMouseLeave(2)}
            onClick={this.handleStarClick(2)}
          >
            <OutlineStar selected={this.shouldSelectStar(2)} />
          </StarContainer>
          <StarContainer
            onMouseEnter={this.handleStarMouseEnter(3)}
            onMouseLeave={this.handleStartMouseLeave(3)}
            onClick={this.handleStarClick(3)}
          >
            <OutlineStar selected={this.shouldSelectStar(3)} />
          </StarContainer>
          <StarContainer
            onMouseEnter={this.handleStarMouseEnter(4)}
            onMouseLeave={this.handleStartMouseLeave(4)}
            onClick={this.handleStarClick(4)}
          >
            <OutlineStar selected={this.shouldSelectStar(4)} />
          </StarContainer>
          <StarContainer
            onMouseEnter={this.handleStarMouseEnter(5)}
            onMouseLeave={this.handleStartMouseLeave(5)}
            onClick={this.handleStarClick(5)}
          >
            <OutlineStar selected={this.shouldSelectStar(5)} />
          </StarContainer>
        </Content>
        <Button
          large
          block
          disabled={this.props.loading}
          onClick={this.handleConfirmClick}
        >
          Confirmar avaliação
        </Button>
      </div>
    );
  }

  renderStep2() {
    const { rate } = this.state;
    return (
      <div>
        <Header>
          <Heading large uppercase>Avaliação enviada!</Heading>
          <Heading2 uppercase color={colors.lightgray}>
            Você avaliou o save com {rate} de 5 estrelas.
          </Heading2>
        </Header>
        <Content>
          <Paragraph color={colors.lightgray}>
            Quer contar mais sobre sua experiência de compra?
            Entre em contato conosco através de nosso chat.
          </Paragraph>
        </Content>
        <Link prefetch href="/saves">
          <Button large outline block textColor={colors.black}>
            Ir para saves
          </Button>
        </Link>
      </div>
    );
  }

  render() {
    const { step } = this.state;
    const { subscription } = this.props;
    return (
      <AuthPage>
        <Container>
          <RenderIf expr={!this.shouldRenderRateForm()}>
            <Header centered>
              <RenderIf expr={subscription === undefined}>
                <Heading>Você não se inscreveu neste save</Heading>
              </RenderIf>
              <RenderIf
                expr={subscription !== undefined && subscription.rate !== null}
              >
                <Heading>Você já avaliou este save</Heading>
              </RenderIf>
            </Header>
          </RenderIf>
          <RenderIf expr={this.shouldRenderRateForm()}>
            <div>
              <RenderIf expr={step === 1}>
                {this.renderStep1()}
              </RenderIf>
              <RenderIf expr={step === 2}>
                {this.renderStep2()}
              </RenderIf>
            </div>
          </RenderIf>
        </Container>
      </AuthPage>
    );
  }
}

export default withAuth()(FeedbackPage);

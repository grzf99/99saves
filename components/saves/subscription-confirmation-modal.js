import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Modal from '../common/modal';
import { colors } from '../styles/variables';
import { Heading, Heading2, Text } from '../common/typography';
import Button from '../common/button';

const Title = styled(Heading)`
  padding: 8.5px 0;

  @media (max-width: 568px) {
   font-size: 19px;
  }
`;

const Subtitle = styled(Heading2)`
  padding: 8.5px 0;
  color: ${colors.lightgray};

  @media (max-width: 568px) {
   font-size: 13px;
  }
`;

const Content = styled(Text)`
  padding: 8.5px 0 35px 0;
  font-size: 14px;
  color: ${colors.lightgray};

  @media (max-width: 568px) {
   font-size: 12px;
  }
`;

export const InvisibleButon = styled(Button)`
  padding: 0;
  padding-top: 28px;
  margin-bottom: -7px;
`;

export default class extends Component {
  static propTypes = {
    subscribeTo: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
  };

  static defaultProps = {
    subscribeTo: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ step: 1 });
    this.props.onClose();
  }

  handleConfirmation() {
    this.setState({ step: 2 });
    this.props.onConfirm(this.props.subscribeTo);
  }

  renderStep1() {
    return (
      <div>
        <Title uppercase>Você realmente pretende comprar esse produto?</Title>
        <Subtitle uppercase>
          Só se junte para negociar conosco
        </Subtitle>
        <Content>
          Não participe apenas por curiosidade, isso enfraquece nossa negociação.
          Junte-se a nós para tornar nossa negociação mais forte.
        </Content>
        <Button block large onClick={this.handleConfirmation}>
          Tenho intenção de comprar
        </Button>
        <InvisibleButon block large negative onClick={this.handleClose}>
          Não sei se vou comprar
        </InvisibleButon>
      </div>
    );
  }

  renderStep2() {
    return (
      <div>
        <Title uppercase>Você agora faz parte deste save!</Title>
        <Subtitle uppercase>
          ASSIM QUE O PRAZO SE ENCERRAR, VOCÊ SERÁ INFORMADO PARA VOTAR E COMPRAR.
        </Subtitle>
        <Content>
          Em breve este save será encerrado e os fabricantes farão suas melhores ofertas.
          Nossa equipe as analisará, selecionará as melhores e disponibilizará para votação aos  participantes.
          O mais votado será eleito e você terá 48 horas para comprar o save vencedor.
          Fique ligado no seu painel de usuário e em seu e-mail.
        </Content>
        <Button block large onClick={this.handleClose}>
          Entendi
        </Button>
      </div>
    );
  }

  render() {
    const { onConfirm, subscribeTo, onClose, ...cleanedProps } = this.props;
    return (
      <Modal {...cleanedProps} onClose={onClose} width="88%">
        {this.state.step === 1 ? this.renderStep1() : null}
        {this.state.step === 2 ? this.renderStep2() : null}
      </Modal>
    );
  }
}

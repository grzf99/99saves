import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import every from 'lodash/every';
import { colors } from '../styles/variables';
import Form from '../common/form';
import Input from '../common/input';
import Select from '../common/select';
import Button from '../common/button';
import { Heading, Heading2 } from '../common/typography';
import { cpf, required } from '../../utils/validation';
import { states } from '../../utils/address';

const FormHeader = styled.div`
  padding-bottom: 30px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 36px;
`;

const FormFooter = styled.div`
  display: flex;
`;

const BackButton = styled(Button)`
  color: ${colors.black};
  width: 50%;
  margin-right: 5px;

  &:hover {
    color: ${colors.white};
    transition: .2s ease color;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 9px 18px;
    width:46%;
  }
`;

const ConfirmButton = styled(Button)`
  width: 50%;
  margin-left: 5px;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px 24px;
    width: 50%;
  }
`;

class SignupStep2 extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.state = {
      name: '',
      cpf: '',
      state: '',
      city: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    console.log(target);
    this.setState({ [target.name]: target.value });
  }

  handleSubmit() {
    this.props.onSubmit(this.state);
  }

  isFormValid() {
    return every(
      ['name', 'cpf', 'state', 'city'],
      key => this.state[key] !== ''
    );
  }

  shouldDisableSubmitButton() {
    return this.props.loading || !this.isFormValid();
  }

  render() {
    return (
      <FormContainer>
        <FormHeader>
          <Heading uppercase>Falta pouco</Heading>
          <Heading2 uppercase fontWeight="500" color={colors.lightgray}>
            Para você participar de nossa plataforma
          </Heading2>
        </FormHeader>
        <Form onSubmit={this.handleSubmit}>
          <Input
            block
            name="name"
            label="Nome"
            placeholder="Seu nome"
            onChange={this.handleChange}
            value={this.state.name}
            validation={required}
          />
          <Input
            block
            name="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            mask="999.999.999-99"
            hint="Fique tranquilo, não usaremos seu CPF sem sua autorização"
            onChange={this.handleChange}
            value={this.state.cpf}
            validation={[required, cpf]}
          />
          <Select
            block
            name="state"
            label="Estado"
            placeholder="Estado que você mora"
            defaultMessage="Escolha o estado"
            options={states}
            onChange={this.handleChange}
            value={this.state.state}
            validation={required}
          />
          <Input
            block
            name="city"
            label="Cidade"
            placeholder="Cidade que você mora"
            onChange={this.handleChange}
            value={this.state.city}
            validation={required}
          />
        </Form>
        <FormFooter>
          <BackButton block large outline onClick={this.props.onBack}>
            Voltar
          </BackButton>
          <ConfirmButton
            block
            large
            disabled={this.shouldDisableSubmitButton()}
            onClick={this.handleSubmit}
          >
            Confirmar
          </ConfirmButton>
        </FormFooter>
      </FormContainer>
    );
  }
}

export default SignupStep2;

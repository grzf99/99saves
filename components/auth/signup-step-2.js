import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
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
`;

const ConfirmButton = styled(Button)`
  width: 50%;
  margin-left: 5px;
`;

class SignupStep2 extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
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
    this.setState({ [target.name]: target.value });
  }

  handleSubmit() {
    this.props.onSubmit(this.state);
  }

  isFormValid() {
    const { name, state, city } = this.state;
    return name !== '' && this.state.cpf !== '' && city !== '' && state !== '';
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
            validation={required}
          />
          <Input
            block
            name="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            mask="111.111.111-11"
            hint="Fique tranquilo, não usaremos seu CPF sem sua autorização"
            onChange={this.handleChange}
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
            validation={required}
          />
          <Input
            block
            name="city"
            label="Cidade"
            placeholder="Cidade que você mora"
            onChange={this.handleChange}
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
            disabled={!this.isFormValid()}
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

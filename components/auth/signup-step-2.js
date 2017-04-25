import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/variables';
import Form from '../common/form';
import Input from '../common/input';
import Button from '../common/button';
import { Heading, Heading2 } from '../common/typography';

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
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
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
        <Form onSubmit={this.props.onSubmit}>
          <Input
            block
            name="name"
            label="Nome"
            placeholder="Seu nome"
            onChange={this.handleChange}
          />
          <Input
            block
            name="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            hint="Fique tranquilo, não usaremos seu CPF sem sua autorização"
            onChange={this.handleChange}
          />
          <Input
            block
            name="state"
            label="Estado"
            placeholder="Estado que você mora"
            onChange={this.handleChange}
          />
          <Input
            block
            name="city"
            label="Cidade"
            placeholder="Cidade que você mora"
            onChange={this.handleChange}
          />
        </Form>
        <FormFooter>
          <BackButton block large outline onClick={this.props.onBack}>
            Voltar
          </BackButton>
          <ConfirmButton block large onClick={this.props.onSubmit}>
            Confirmar
          </ConfirmButton>
        </FormFooter>
      </FormContainer>
    );
  }
}

export default SignupStep2;

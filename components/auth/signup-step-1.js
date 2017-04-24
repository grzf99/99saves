import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '../styles/variables';
import RenderIf from '../common/render-if';
import FacebookButton from '../common/facebook-button';
import Form from '../common/form';
import Input from '../common/input';
import Button from '../common/button';
import SubmitButton from '../common/submit-button';
import { Heading, Heading2, SeparatorText } from '../common/typography';

const FormHeader = styled.div`
  padding-bottom: 30px;
`;

const FormContainer = styled.div`
  background: white;
  padding: 36px;
`;

const FormFooter = styled.div`
  padding: 16px 0;
  text-align: center;
`;

class SignupStep1 extends Component {
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
    const { email, password } = this.state;
    return (
      <div>
        <FormContainer>
          <FormHeader>
            <Heading large uppercase>Crie sua conta</Heading>
            <Heading2 uppercase fontWeight="500" color={colors.lightgray}>
              Juntos pelos maiores descontos do mercado
            </Heading2>
          </FormHeader>
          <Form onSubmit={this.props.onSubmit}>
            <Input
              block
              name="email"
              type="email"
              label="Email"
              placeholder="exemplo@exemplo.com"
              onChange={this.handleChange}
            />
            <Input
              block
              name="password"
              type="password"
              label="Criar Senha"
              placeholder="crie sua senha"
              hint="Sua senha deve ter senha ao menos 8 dígitos, além de letras e números"
              onChange={this.handleChange}
            />
          </Form>
          <SubmitButton
            block
            onClick={() => this.props.onSubmit({ email, password })}
          >
            Criar conta com email
          </SubmitButton>
          <RenderIf expr={false}>
            <div>
              <SeparatorText>ou</SeparatorText>
              <FacebookButton block>Criar conta com facebook</FacebookButton>
            </div>
          </RenderIf>
        </FormContainer>
        <FormFooter>
          <Link prefetch href="/login">
            <Button outline>Já tenho uma conta</Button>
          </Link>
        </FormFooter>
      </div>
    );
  }
}

export default SignupStep1;

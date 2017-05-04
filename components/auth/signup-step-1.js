import React, { Component, PropTypes } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '../styles/variables';
import Form from '../common/form';
import Input from '../common/input';
import Button from '../common/button';
import { Heading, Heading2, FormAlert } from '../common/typography';
import { email, minLength } from '../../utils/validation';

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
  static propTypes = {
    isUserAvailable: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string
    })
  };

  static defaultProps = {
    isUserAvailable: true,
    user: {
      email: '',
      password: ''
    }
  };

  constructor(props) {
    super(props);
    // Don't do this in other places
    // This is an anti-pattern in most cases
    // as you can see here: https://github.com/vasanthk/react-bits/blob/master/anti-patterns/01.props-in-initial-state.md
    // On this specific case, we want the props to be passed to state just once
    this.state = { ...props.user };
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
    return this.state.email !== '' && this.state.password !== '';
  }

  render() {
    return (
      <div>
        <FormContainer>
          <FormHeader>
            <Heading large uppercase>Crie sua conta</Heading>
            <Heading2 uppercase fontWeight="500" color={colors.lightgray}>
              Juntos pelos menores preços do mercado
            </Heading2>
          </FormHeader>
          <Form onSubmit={this.handleSubmit}>
            {!this.props.isUserAvailable
              ? <FormAlert>Já existe um usuário com este email.</FormAlert>
              : null}
            <Input
              block
              name="email"
              type="email"
              label="Email"
              placeholder="exemplo@exemplo.com"
              onChange={this.handleChange}
              value={this.state.email}
              validation={email}
            />
            <Input
              block
              name="password"
              type="password"
              label="Criar Senha"
              placeholder="crie sua senha"
              hint="Sua senha deve ter ao menos 8 dígitos, além de letras e números"
              onChange={this.handleChange}
              value={this.state.password}
              validation={minLength(8)}
            />
          </Form>
          <Button
            block
            large
            disabled={!this.isFormValid()}
            onClick={this.handleSubmit}
          >
            Criar conta com email
          </Button>
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

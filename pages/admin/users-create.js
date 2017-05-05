import React from 'react';
import axios from 'axios';
import request from 'superagent';
import Router from 'next/router';
import moment from 'moment';
import FRC, { Input, Row, Textarea, Checkbox } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';

class UsersCreate extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: ''
    };
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  submitForm(data) {
    if (!data.name || !data.email || !data.password) {
      return alert('Preencha todos os campos obrigatórios'); // eslint-disable-line
    }

    const rest = this.props.api
      .post('/users', data)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro cadastrado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/users'), 2500);
      })
      .catch(() => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: 'Erro ao alterar o registro'
        });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      });

    return rest;
  }

  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="panel-title">Cadastrar Usuário</span>
              </div>

              <div className="panel-body">
                {this.state.loading
                  ? <div className="pull-center">
                    <Loading type="bars" color="#000000" />
                  </div>
                  : <FRC.Form onSubmit={this.submitForm} layout="vertical">
                    <Input name="id" type="hidden" />
                    <Input
                      name="name"
                      id="name"
                      label="Nome do usuário"
                      type="text"
                      placeholder="Nome do usuário"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="email"
                      id="email"
                      label="E-mail"
                      type="text"
                      placeholder="E-mail"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="password"
                      id="password"
                      label="Senha"
                      type="password"
                      placeholder="Senha"
                      require
                      rowClassName="col-sm-12"
                    />
                    <Row layout="vertical" rowClassName="col-sm-12">
                      <div className="text-left">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          defaultValue="Enviar"
                        />
                      </div>
                    </Row>
                  </FRC.Form>}
              </div>
            </div>
          </div>
        </div>
        <AlertMessage type={this.state.typeToast} show={this.state.showToast}>
          {this.state.messageToast}
        </AlertMessage>
      </Layout>
    );
  }
}

export default withAuth({ isAdminPage: true })(UsersCreate);

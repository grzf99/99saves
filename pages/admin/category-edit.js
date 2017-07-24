import React from 'react';
import request from 'superagent';
import Router from 'next/router';
import startOfDay from 'date-fns/start_of_day';
import formatDate from 'date-fns/format';
import FRC, { Input, Row, Textarea, Select } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';
import RenderIf from '../../components/common/render-if';

class CiclesEdit extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      btnEnabled: false,
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: ''
    };
    this.getCategory = this.getCategory.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.getCategory(this.props.query.id);
    this.getCategories();
  }

  getCategory(id) {
    this.props.api
      .get(`/categories/${id}`)
      .then((response) => {
        this.setState({
          ...this.state,
          list: response.data
        });
        setTimeout(() => this.setState({ loading: false }), 1500);
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Problemas ao se comunicar com API: ${error.message}`
        });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      });
  }

  getCategories() {
    let list = [{ value: '', label: 'Selecione uma categoria' }];
    this.props.api
      .get(`/categories/all`)
      .then((response) => {
        response.data.map( (item) => {
          list.push({ value: item.id, label: item.title});
        });
        this.setState({ selectCategories: list });
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Problemas ao se comunicar com API: ${error.message}`
        });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      });
  }

  isFormValid(values) {
    return (
      values.title
    );
  }

  submitForm(data) {
    const values = Object.assign({}, data, {});

    values.CategoryId == '' && (delete values.CategoryId);

    if (!this.isFormValid(values)) {
      return alert('Preencha todos os campos obrigatórios'); // eslint-disable-line
    }

    const rest = this.props.api
      .put(`/categories/${values.id}`, values)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro alterado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/categories'), 2500);
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Erro ao alterar o registro ${error.message}`
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
                <span className="panel-title">Alterar Categoria</span>
              </div>

              <div className="panel-body">
                <RenderIf expr={this.state.loading}>
                  <div className="pull-center">
                    <Loading type="bars" color="#000000" />
                  </div>
                </RenderIf>
                <RenderIf expr={!this.state.loading}>
                  <FRC.Form onSubmit={this.submitForm} layout="vertical">
                    <Input
                      name="id"
                      value={this.state.list.id || ''}
                      type="hidden"
                    />
                    <Select
                      name="CategoryId"
                      value={this.state.list.CategoryId || ''}
                      label="Categoria Mãe"
                      id="category"
                      options={this.state.selectCategories}
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="title"
                      value={this.state.list.title}
                      id="title"
                      label="Título da categoria"
                      type="text"
                      placeholder="Título da categoria"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Row layout="vertical" rowClassName="col-sm-12">
                      <div className="text-left">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          defaultValue="Enviar"
                          disabled={this.state.btnEnabled ? 'disabled' : ''}
                        />
                      </div>
                    </Row>
                  </FRC.Form>
                </RenderIf>
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

export default withAuth({ isAdminPage: true })(CiclesEdit);

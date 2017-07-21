import React from 'react';
import request from 'superagent';
import Router from 'next/router';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';
import FRC, { Input, Row, Textarea, Select } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';
import RenderIf from '../../components/common/render-if';

class CategoryCreate extends React.Component {
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
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    setTimeout(() => this.setState({ loading: false }), 1500);
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

  handleSave(event) {
    this.setState({ btnEnabled: true });
    this.handleImageUpload(event.target.files[0], event.target.name);
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
      this.setState({
        showToast: true,
        typeToast: 'warning',
        messageToast: 'Preencha todos os campos obrigatórios'
      });
      setTimeout(() => this.setState({ showToast: false }), 4500);
      return;
    }

    const rest = this.props.api
      .post('/categories', values)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro cadastrado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/categories'), 2000);
      })
      .catch(() => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: 'Erro ao inserir o registro'
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
                <span className="panel-title">Cadastrar Categoria</span>
              </div>

              <div className="panel-body">
                <RenderIf expr={this.state.loading}>
                  <div className="pull-center">
                    <Loading type="bars" color="#000000" />
                  </div>
                </RenderIf>
                <RenderIf expr={!this.state.loading}>
                  <FRC.Form onSubmit={this.submitForm} layout="vertical">
                    <Input name="id" type="hidden" />
                    <Select
                      name="CategoryId"
                      value={this.state.list.CategoryId || ''}
                      label="Categoria Mãe"
                      id="category"
                      options={this.state.selectCategories}
                      rowClassName="col-sm-12"
                    />
                    <Textarea
                      name="title"
                      value=""
                      rows=20
                      id="title"
                      label="Título da categoria"
                      type="text"
                      placeholder="Título da categoria (separado por quebras de linha)"
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

export default withAuth({ isAdminPage: true })(CategoryCreate);

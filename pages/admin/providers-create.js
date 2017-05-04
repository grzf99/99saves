import React from 'react';
import axios from 'axios';
import request from 'superagent';
import Router from 'next/router';
import FRC, { Input, Row } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';
import RenderIf from '../../components/common/render-if';

class ProvidersCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: ''
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  handleSave(event) {
    this.handleImageUpload(event.target.files[0], event.target.name);
  }

  handleImageUpload(file, name) {
    const imageChange = {};
    const upload = request
      .post(config.CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Problemas ao se comunicar com API: ${err}`
        });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      }

      if (response.body.secure_url !== '') {
        imageChange[name] = response.body.secure_url;
        this.setState(imageChange);
      }
    });
  }

  submitForm(data) {
    const values = Object.assign(data, { logo: this.state.logo });

    if (!values.name || !values.cnpj || !values.phone || !values.email) {
      this.setState({
        showToast: true,
        typeToast: 'warning',
        messageToast: 'Preencha todos os campos obrigatórios'
      });
      setTimeout(() => this.setState({ showToast: false }), 4500);
    }

    if (!values.logo) delete values.logo;

    const rest = this.props.api
      .post('/providers', values)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro cadsatrado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/providers'), 2000);
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
                <span className="panel-title">Cadastrar Fornecedor</span>
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
                      value=""
                      id="name"
                      label="Nome do fornecedor"
                      type="text"
                      placeholder="Nome do fornecedor"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="email"
                      value=""
                      id="email"
                      label="Email do fornecedor"
                      type="text"
                      placeholder="Email do fornecedor"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="cnpj"
                      value=""
                      id="cnpj"
                      label="CNPJ do fornecedor"
                      type="text"
                      placeholder="CNPJ do fornecedor"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="responsible"
                      value=""
                      id="responsible"
                      label="Responsável do fornecedor"
                      type="text"
                      placeholder="Responsável do fornecedor"
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="phone"
                      value=""
                      id="phone"
                      label="Telefone do fornecedor"
                      type="text"
                      placeholder="Telefone do fornecedor"
                      required
                      rowClassName="col-sm-12"
                    />

                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="logo">
                          Logo
                        </label>
                      <div className="controls">
                        <input
                          type="file"
                          name="logo"
                          onChange={this.handleSave}
                        />
                      </div>
                        <RenderIf expr={this.state.btnEnabled}>
                          <Loading type="bars" color="#000000" />  
                        </RenderIf>

                        <RenderIf expr={(this.state.logo)}> 
                          <img className="col-md-3" src={this.state.logo} alt="brand" />
                        </RenderIf>
                    </div>
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

export default withAuth({ isAdminPage: true })(ProvidersCreate);

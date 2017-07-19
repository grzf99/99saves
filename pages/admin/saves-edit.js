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

class SavesEdit extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      image_default: '',
      startDate: '',
      list: [],
      btnEnabled: false,
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: ''
    };
    this.getSaves = this.getSaves.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    this.getSaves(this.props.query.id);
    this.getCategories();
  }

  getSaves(id) {
    this.props.api
      .get(`/saves/${id}`)
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

  handleSave(event) {
    this.setState({ btnEnabled: true });
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
        this.setState({ btnEnabled: false });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      }

      if (response.body.secure_url !== '') {
        imageChange[name] = response.body.secure_url;
        this.setState({ btnEnabled: false });
        this.setState(imageChange);
      }
    });
  }

  submitForm(data) {
    const values = Object.assign({}, data, {
      image_default: this.state.image_default
    });

    if (!values.title, !values.CategoryId) {
      return alert('Preencha todos os campos obrigatórios'); // eslint-disable-line
    }

    if (!values.image_default) delete values.image_default;

    const rest = this.props.api
      .put(`/saves/${values.id}`, values)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro alterado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/saves'), 2500);
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Err ao alterar o registro ${error.message}`
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
                <span className="panel-title">Alterar Save</span>
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
                      label="Categoria"
                      id="category"
                      options={this.state.selectCategories}
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="title"
                      id="title"
                      value={this.state.list.title || ''}
                      label="Título do save"
                      type="text"
                      placeholder="Título do save"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Textarea
                      rows={3}
                      cols={40}
                      name="description"
                      value={this.state.list.description || ''}
                      label="Descrição do save"
                      placeholder="Descrição"
                      rowClassName="col-sm-12"
                    />
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="image_default">
                        Imagem de destaque
                      </label>
                      <div className="controls">
                        <input
                          type="file"
                          name="image_default"
                          onChange={this.handleSave}
                        />
                      </div>
                      <RenderIf
                        expr={
                          !!this.state.list.image_default &&
                            !this.state.image_default
                        }
                      >
                        <img
                          className="col-md-3"
                          src={this.state.list.image_default}
                          alt="image"
                        />
                      </RenderIf>

                      <RenderIf expr={!!this.state.image_default}>
                        <img
                          className="col-md-3"
                          src={this.state.image_default}
                          alt="save"
                        />
                      </RenderIf>
                    </div>
                    <RenderIf expr={this.state.btnEnabled}>
                      <div className="form-group col-sm-12">
                        <Loading type="bars" color="#000000" />
                      </div>
                    </RenderIf>
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

export default withAuth({ isAdminPage: true })(SavesEdit);

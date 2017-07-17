import React from 'react';
import request from 'superagent';
import Router from 'next/router';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';
import FRC, { Input, Row, Textarea } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';
import RenderIf from '../../components/common/render-if';

class CiclesCreate extends React.Component {
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
    this.submitForm = this.submitForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    this.getSaves();
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  getSaves() {
    this.props.api
      .get(`/saves/`)
      .then((response) => {
        this.setState({
          ...this.state,
          selectSaves: response.data
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

  isFormValid(values) {
    return (
      values.title &&
      values.image_default &&
      values.date_start &&
      values.date_end
    );
  }

  submitForm(data) {
    const values = Object.assign({}, data, {
      date_start: startOfDay(data.date_start).toJSON(),
      date_end: endOfDay(data.date_end).toJSON()
    });

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
      .post('/cicles', values)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro cadsatrado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/cicles'), 2000);
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
                <span className="panel-title">Cadastrar Ciclo</span>
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
                      name="SaveId"
                      value={this.state.list.SaveId || ''}
                      label="Save"
                      id="save"
                      help="Campo obriagatório"
                      options={this.state.selectSaves}
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="date_start"
                      value=""
                      label="Abertura do save"
                      type="date"
                      required
                      rowClassName="col-sm-6"
                    />
                    <Input
                      name="date_end"
                      value=""
                      label="Fechamento para envio de ofertas"
                      type="date"
                      required
                      rowClassName="col-sm-6"
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

export default withAuth({ isAdminPage: true })(CiclesCreate);

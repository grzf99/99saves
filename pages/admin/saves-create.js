import React from 'react';
import request from 'superagent';
import Router from 'next/router';
import moment from 'moment';
import FRC, { Input, Row, Textarea } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';
import RenderIf from '../../components/common/render-if';

class SavesCreate extends React.Component {
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
      typeToast: '',
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  handleSave(event) {
    this.setState({ btnEnabled: true });
    this.handleImageUpload(event.target.files[0], event.target.name);
  }

  handleImageUpload(file, name) {
    const imageChange = {};
    const upload = request.post(config.CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        this.setState({ showToast: true, typeToast: 'warning', messageToast: `Problemas ao se comunicar com API: ${err}` });
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
    return values.title && values.image_default && values.date_start && values.date_end;
  }

  submitForm(data) {
    const values = Object.assign(data, {
      image_default: this.state.image_default,
      date_start: moment(data.date_start, moment.ISO_8859).format(),
      date_end: moment(data.date_end, moment.ISO_8859).format()
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

    if (!values.image_default) delete values.image_default;

    const rest = this.props.api.post('/saves', values)
        .then(() => {
          this.setState({ showToast: true, typeToast: 'success', messageToast: 'Registro cadsatrado com Sucesso' });
          setTimeout(() => Router.push('/admin/saves'), 2000);
        })
        .catch(() => {
          this.setState({ showToast: true, typeToast: 'warning', messageToast: 'Erro ao inserir o registro' });
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
                      type="hidden"
                    />
                    <Input
                      name="title"
                      value=""
                      id="title"
                      label="Título do save"
                      type="text"
                      placeholder="Título do save"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="date_start"
                      value=""
                      label="Data início do save"
                      type="date"
                      required
                      rowClassName="col-sm-6"
                    />
                    <Input
                      name="date_end"
                      value=""
                      label="Data finalização do save"
                      type="date"
                      required
                      rowClassName="col-sm-6"
                    />
                    <Textarea
                      rows={3}
                      cols={40}
                      name="description"
                      value=""
                      label="Descrição do save"
                      placeholder="Descrição"
                      rowClassName="col-sm-12"
                    />
                    <div className="form-group col-sm-12">
                      <label
                        className="control-label"
                        htmlFor="image_default"
                      >Imagem de destaque</label>
                      <div className="controls">
                        <input type="file" name="image_default" onChange={this.handleSave} />
                      </div>
                      <RenderIf expr={this.state.btnEnabled}>
                          <Loading type="bars" color="#000000" />  
                        </RenderIf>

                        <RenderIf expr={(!!this.state.image_default)}> 
                          <div className="controls">
                            <img className="col-md-3" src={this.state.image_default} alt="image" />
                          </div>
                        </RenderIf>
                    </div>
                    <Row layout="vertical" rowClassName="col-sm-12">
                      <div className="text-left">
                        <input className="btn btn-primary" type="submit" defaultValue="Enviar" disabled={this.state.btnEnabled ? 'disabled' : ''} />
                      </div>
                    </Row>
                  </FRC.Form>
                </RenderIf>
              </div>
            </div>
          </div>
        </div>
        <AlertMessage type={this.state.typeToast} show={this.state.showToast}>
          { this.state.messageToast }
        </AlertMessage>
      </Layout>
    );
  }
}

export default withAuth({ isAdminPage: true })(SavesCreate)

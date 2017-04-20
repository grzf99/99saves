import React from 'react';
import axios from 'axios';
import request from 'superagent';
import Router from 'next/router';
import moment from 'moment';
import FRC, { Input, Row, Textarea } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';

class SavesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_default: '',
      image2: '',
      image3: '',
      startDate: '',
      list: [],
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: '',
    };
    this.getSaves = this.getSaves.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    this.getSaves(this.props.url.query.id);
  }

  getSaves(id) {
    axios.get(`${config.API_URL}/saves/${id}`)
        .then((response) => {
          this.setState({
            ...this.state, list: response.data
          });
          setTimeout(() => this.setState({ loading: false }), 1500);
        })
        .catch((error) => {
          console.log(error); // eslint-disable-line
        });
  }

  handleSave(event) {
    this.handleImageUpload(event.target.files[0], event.target.name);
  }

  handleImageUpload(file, name) {
    const imageChange = {};
    const upload = request.post(config.CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err); // eslint-disable-line
      }

      if (response.body.secure_url !== '') {
        imageChange[name] = response.body.secure_url;
        this.setState(imageChange);
      }
    });
  }

  submitForm(data) {
    const values = Object.assign(data, {
      image_default: this.state.image_default,
      image2: this.state.image2,
      image3: this.state.image3,
      date_start: moment(data.date_start, moment.ISO_8859).format(),
      date_end: moment(data.date_end, moment.ISO_8859).format()
    });

    if (!values.title || !values.date_start || !values.date_end) {
      return alert('Preencha todos os campos obrigatórios');  // eslint-disable-line
    }

    if (!values.image_default) delete values.image_default;
    if (!values.image2) delete values.image2;
    if (!values.image3) delete values.image3;

    const rest = axios.put(`${config.API_URL}/saves/${values.id}`, values)
        .then(() => {
          this.setState({ showToast: true, typeToast: 'success', messageToast: 'Registro alterado com Sucesso' });
          setTimeout(() => Router.push('/admin/saves'), 2500);
        })
        .catch(() => {
          this.setState({ showToast: true, typeToast: 'warning', messageToast: 'Erro ao alterar o registro' });
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
                {this.state.loading ? (
                  <div className="pull-center">
                    <Loading type="bars" color="#000000" />
                  </div>
                ) : (
                  <FRC.Form onSubmit={this.submitForm} layout="vertical">
                    <Input
                      name="id"
                      value={this.state.list.id || ''}
                      type="hidden"
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
                    <Input
                      name="date_start"
                      value={moment(this.state.list.date_start).format('YYYY-MM-DD') || ''}
                      label="Data início do save"
                      type="date"
                      required
                      rowClassName="col-sm-6"
                    />
                    <Input
                      name="date_end"
                      value={moment(this.state.list.date_end).format('YYYY-MM-DD') || ''}
                      label="Data finalização do save"
                      type="date"
                      required
                      rowClassName="col-sm-6"
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
                      <label
                        className="control-label"
                        htmlFor="image_default"
                      >Imagem de destaque</label>
                      <div className="controls">
                        <input type="file" name="image_default" onChange={this.handleSave} />
                      </div>
                    </div>
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="image2">Outra imagem</label>
                      <div className="controls">
                        <input type="file" name="image2" onChange={this.handleSave} />
                      </div>
                    </div>
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="image3">Outra imagem</label>
                      <div className="controls">
                        <input type="file" name="image3" onChange={this.handleSave} />
                      </div>
                    </div>
                    <Row layout="vertical" rowClassName="col-sm-12">
                      <div className="text-left">
                        <input className="btn btn-primary" type="submit" defaultValue="Enviar" />
                      </div>
                    </Row>
                  </FRC.Form>
                )}
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

export default withAuth({ admin: true })(SavesEdit);

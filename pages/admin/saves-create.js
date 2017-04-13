import React from 'react';
import axios from 'axios';
import request from 'superagent';
import Router from 'next/router';
import moment from 'moment';
import FRC, { Input, Row, Textarea } from 'formsy-react-components';
import Loading from 'react-loading';

import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';

export default class extends React.Component {
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
        this.setState({ showToast: true, typeToast: 'warning', messageToast: 'Problemas ao se comunicar com API: ' + err });
          setTimeout(() => this.setState({ showToast: false }), 2500);
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

    if (!values.title || !values.date_start || !values.date_end || !values.image_default) {
      this.setState({ showToast: true, typeToast: 'warning', messageToast: 'Preencha todos os campos obrigatórios' });
      setTimeout(() => this.setState({ showToast: false }), 4500);
    }

    if (!values.image_default) delete values.image_default;
    if (!values.image2) delete values.image2;
    if (!values.image3) delete values.image3;

    const rest = axios.post(`${config.API_URL}/saves}`, values)
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

  myForm = (
    <Form
      onSubmit={(values, redirectPage) => {
        console.log(this.state);
        if(this.state.image_default) values.image_default = this.state.image_default;
        var dt_end = this.state.date_start.split("/");

        if(this.state.date_start) values.date_start = [dt_end[1], dt_end[0], dt_end[2]].join('-')
        var dt_end = this.state.date_end.split("/");

        if(this.state.date_end) values.date_end = [dt_end[1], dt_end[0], dt_end[2]].join('-');
        console.log(values);

        const rest = axios.post(`${config.API_URL}/saves`, values)
        .then(function (response) {
          console.log(response);
          Router.push('/admin/saves');
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }}
      validate={({ title }) => {
        return {
          title: !title ? 'Título é obrigatório' : undefined
        }
      }}
    >
      {({submitForm}) => {
        return (
          <form onSubmit={submitForm}>
            <div className="form-group has-feedback col-sm-12">
              <label className="control-label">Título</label>
              <div className="controls">
                <Text field='title' className="form-control"/>
              </div>
            </div>

            <div className="form-group has-feedback col-sm-6">
              <label className="control-label">Data início do save</label>
              <div className="controls">
                <MaskedInput mask="11/11/1111" className="form-control" name="date_start" placeholder="dd/mm/yyyy" onChange={this._onChange}/>
              </div>
            </div>

            <div className="form-group has-feedback col-sm-6">
              <label className="control-label">Data finalização do save</label>
              <div className="controls">
                <div className="controls">
                  <MaskedInput mask="11/11/1111" className="form-control" name="date_end" placeholder="dd/mm/yyyy" onChange={this._onChange}/>
                </div>
              </div>
            </div>

            <div className="form-group has-feedback  col-sm-12">
              <label className="control-label">Description</label>
              <div className="controls">
                <Textarea field='description' className="form-control"/>
              </div>
            </div>
            <div className="form-group has-feedback  col-sm-12">
              <label className="control-label">Imagem de destaque</label>
              <div className="controls">
                <input type='file' name='image_default' className="form-control" onChange={this.handleSave} />
              </div>
            </div>

            <div className="form-group has-feedback  col-sm-12">
              <label className="control-label">Imagem secundária</label>
              <div className="controls">
                <input type='file' name='imagem2' className="form-control" onChange={this.handleSave} />
              </div>
            </div>

            <div className="form-group has-feedback col-sm-12">
              <label className="control-label">Imagem secundária</label>
              <div className="controls">
                <input type='file' name='imagem3' className="form-control" onChange={this.handleSave} />
              </div>
            </div>
            
            <div className="form-group has-feedback col-sm-12">
              <button type='submit' className="btn btn-default">Salvar</button>
            </div>
          </form>
        )
      }}
    </Form>
  )

  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="panel-title">Cadastrar Save</span>
              </div>

              <div className="panel-body">
                { this.myForm }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

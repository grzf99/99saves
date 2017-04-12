import React from 'react';
import axios from 'axios';
import request from 'superagent';
import Router from 'next/router';
import moment from 'moment';
import FRC, { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } from 'formsy-react-components';
import Loading from 'react-loading';

import config from '../../config';
import Layout from '../../components/admin/layout';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_default: '',
      image2: '',
      image3: '',
      startDate: '',
      list: [],
      loading: true
    };
    this.getSaves = this.getSaves.bind(this);
    this._onChange = this._onChange.bind(this);
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
          console.log(error);
        });
  }

  handleSave = (event) => {
    this.handleImageUpload(event.target.files[0], event.target.name);
  }

  _onChange = (e)  => {
    var stateChange = {}
    stateChange[e.target.name] = e.target.value;
    this.setState(stateChange);
  }
  

  handleImageUpload(file, name) {
    var imageChange = {};
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(name);
        console.log(response.body.secure_url);
        imageChange[name] = response.body.secure_url;
        this.setState(imageChange);
        console.log(this.state);
      }
    });
  }

  //coisas do novo form
  submitForm = (data) => {
    data.image_default = this.state.image_default;
    data.image2 = this.state.image3;
    data.image3 = this.state.image3;
    data.date_start = moment(data.date_start, moment.ISO_8859).format();
    data.date_end = moment(data.date_end, moment.ISO_8859).format();

    if (!data.title || !data.date_start || !data.date_end) {
      return alert('Preencha todos os campos obrigatórios');
    }

    if (!data.image_default) delete data.image_default;
    if (!data.image2) delete data.image2;
    if (!data.image3) delete data.image3;

    const rest = axios.put(`${config.API_URL}/saves/${data.id}`, data)
        .then(function (response) {
          Router.push('/admin/saves');
        })
        .catch(function (error) {
          console.log(error);
        });
  }

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
                {this.state.loading ? (
                  <div className="pull-center">
                    <Loading type='bars' color='#000000' />
                  </div>
                ) : (
                  <FRC.Form
                      onSubmit={this.submitForm}
                      layout="vertical"
                  >
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
                      <label className="control-label">Imagem de destaque</label>
                      <div className="controls">
                        <input type='file' name='image_default' onChange={this.handleSave} />
                      </div>
                    </div>
                    <div className="form-group col-sm-12">
                      <label className="control-label">Outra imagem</label>
                      <div className="controls">
                        <input type='file' name='image2' onChange={this.handleSave} />
                      </div>
                    </div>
                    <div className="form-group col-sm-12">
                      <label className="control-label">Outra imagem</label>
                      <div className="controls">
                        <input type='file' name='image3' onChange={this.handleSave} />
                      </div>
                    </div>
                    
                    <Row layout="vertical" rowClassName="col-sm-12">
                      <div className="text-left">
                        <input className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Submit" />
                      </div>
                    </Row>
                  </FRC.Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

import React from 'react';
import axios from 'axios';
import request from 'superagent';
import Router from 'next/router';
import moment from 'moment';
import FRC, { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } from 'formsy-react-components';

import config from '../../config';
import Layout from '../../components/admin/layout';

const CLOUDINARY_UPLOAD_PRESET = 'k0xbougu';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/kevinsoul/upload';

//Estilo do layout no formulario "vertical", "horizontal", "elementOnly"
const layoutChoice = 'vertical';
let myform = null;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_default: '',
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
            ...this.state, list: response.data, loading: true
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

  handleDateChange = (date) => {
    this.setState({
      startDate: date
    });
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
    data.date_start = moment(data.date_start, moment.ISO_8859).format();
    data.date_end = moment(data.date_end, moment.ISO_8859).format();

    if (!data.title || !data.date_start || !data.date_end) {
      return alert('Preencha todos os campos obrigatórios');
    }

    if (!data.image_default) delete data.image_default;

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
                <FRC.Form
                    onSubmit={this.submitForm}
                    layout={layoutChoice}
                    ref={(form) => { myform = form; }}
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
                  <File
                    name="image2"
                    label="Imagem"
                    multiple
                    rowClassName="col-sm-12"
                  />
                  <File
                    name="image3"
                    label="Imagem"
                    multiple
                    rowClassName="col-sm-12"
                  />
                  
                  <Row layout={layoutChoice} rowClassName="col-sm-12">
                    <div className="text-left">
                      <input className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Submit" />
                    </div>
                  </Row>
                </FRC.Form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

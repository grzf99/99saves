import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import 'isomorphic-fetch';

import config from '../../config';
import Layout from '../../components/admin/layout';

import { Form, Text, Textarea } from 'react-form';
import MaskedInput from 'react-maskedinput';
import axios from 'axios';
import request from 'superagent';
import Router from 'next/router';

const Title = styled.h1`
  color: red;
  font-size: ${modularScale(1)};
`;

const CLOUDINARY_UPLOAD_PRESET = 'k0xbougu';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/kevinsoul/upload';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_default: '',
      startDate: ''
    };
  }

  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${config.API_URL}/todos`);
    const json = await res.json();
    return { json};
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
          Router.push('/admin');
        })
        .catch(function (error) {
          console.log(error);
          //redirect page
          Router.push('/admin');
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

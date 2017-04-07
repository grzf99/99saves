import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import 'isomorphic-fetch';

import config from '../../config';
import Layout from '../../components/admin/layout';

import { Form, Text, Textarea } from 'react-form';
import MaskedInput from 'react-maskedinput';
import moment from 'moment';
import axios from 'axios';

const Title = styled.h1`
  color: red;
  font-size: ${modularScale(1)};
`;

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
    event.preventDefault();
    const img = event.target.files[0].name || '';
    this.setState({image_default: img})
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

  myForm = (
    <Form
      onSubmit={(values) => {
        console.log(this.state);
        if(this.state.image_default) values.image_default = this.state.image_default;
        if(this.state.date_start) values.date_start = moment().format(this.state.date_start, 'mm-dd-yyyy');
        if(this.state.end) values.date_end = moment().format(this.state.date_end, 'mm-dd-yyyy');
        console.log(values);
        const rest = axios.post(`${config.API_URL}/saves`, values)
        .then(function (response) {
          console.log(response);
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
              <label className="control-label">Data finalização' do save</label>
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
                <input type='file' name='default_image' className="form-control" onChange={this.handleSave} />
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

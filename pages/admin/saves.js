import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import 'isomorphic-fetch';

import config from '../../config';
import Layout from '../../components/admin/layout';

import { Form, Text, Textarea } from 'react-form';
import DatePicker from 'react-datepicker';
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
      startDate: moment()
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

  myForm = (
    <Form
      onSubmit={(values) => {
        if(this.state.image_default) values.image_default = this.state.image_default;
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
            <div className="form-group has-feedback">
              <label className="control-label">Título</label>
              <div className="controls">
                <Text field='title' className="form-control"/>
              </div>
            </div>

            <div className="form-group has-feedback">
              <label className="control-label">Data início do save</label>
              <div className="controls">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleDateChange} />
              </div>
            </div>

            <div className="form-group has-feedback">
              <label className="control-label">Data finalização' do save</label>
              <div className="controls">
                <div className="controls">
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange} />
                </div>
              </div>
            </div>

            <div className="form-group has-feedback">
              <label className="control-label">Description</label>
              <div className="controls">
                <Textarea field='description' className="form-control"/>
              </div>
            </div>
            <div className="form-group has-feedback">
              <label className="control-label">Imagem de destaque</label>
              <div className="controls">
                <input type='file' name='default_image' className="form-control" onChange={this.handleSave} />
              </div>
            </div>

            <div className="form-group has-feedback">
              <label className="control-label">Imagem secundária</label>
              <div className="controls">
                <input type='file' name='imagem2' className="form-control" onChange={this.handleSave} />
              </div>
            </div>

            <div className="form-group has-feedback">
              <label className="control-label">Imagem secundária</label>
              <div className="controls">
                <input type='file' name='imagem3' className="form-control" onChange={this.handleSave} />
              </div>
            </div>
            
            <button type='submit' className="btn btn-default">Salvar</button>
          </form>
        )
      }}
    </Form>
  )

  render() {
    return (
      <Layout>
        <div className="row">
          <div class="col-lg-12">
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

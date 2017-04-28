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

class CouponsEdit extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: '',
    };
    this.getCoupons = this.getCoupons.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.getCoupons(this.props.query.id);
  }

  getCoupons(id) {
    this.props.api.get(`/coupons/${id}`)
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

  submitForm(data) {

    // if (!data.key) {
    //   return alert('Preencha todos os campos obrigatórios');  // eslint-disable-line
    // }

    const rest = this.props.api.put(`/coupons/${data.id}`, data)
        .then(() => {
          this.setState({ showToast: true, typeToast: 'success', messageToast: 'Registro inserido com Sucesso' });
          setTimeout(() => Router.push('/admin/coupons'), 2500);
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
                <span className="panel-title">Alterar Cupom</span>
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
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="">Save - {this.state.list.Subscription.Save.title}</label>
                      <div className="controls">
                      </div>
                    </div>

                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="">Produto - {this.state.list.Product.title}</label>
                      <div className="controls">
                      </div>
                    </div>
                    
                    <Input
                      name="key"
                      id="key"
                      value={this.state.list.key || ''}
                      label="Nº Cupom"
                      type="text"
                      placeholder="Nº Cupom"
                      required
                      rowClassName="col-sm-12"
                    />
                    
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

export default withAuth({ isAdminPage: true })(CouponsEdit);

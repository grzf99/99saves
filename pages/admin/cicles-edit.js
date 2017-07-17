import React from 'react';
import request from 'superagent';
import Router from 'next/router';
import startOfDay from 'date-fns/start_of_day';
import formatDate from 'date-fns/format';
import FRC, { Input, Row, Textarea, Select } from 'formsy-react-components';
import Loading from 'react-loading';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';
import RenderIf from '../../components/common/render-if';

class CiclesEdit extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

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
    this.getSaves = this.getSaves.bind(this);
    this.getCicle = this.getCicle.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.getCicle(this.props.query.id);
    this.getSaves();
  }

  getCicle(id) {
    this.props.api
      .get(`/cicles/${id}/cicle`)
      .then((response) => {
        this.setState({
          ...this.state,
          list: response.data
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

  submitForm(data) {
    const values = Object.assign({}, data, {
      date_start: startOfDay(data.date_start).toJSON()
    });

    if (!values.title || !values.date_start) {
      return alert('Preencha todos os campos obrigatórios'); // eslint-disable-line
    }

    if (!values.image_default) delete values.image_default;

    const rest = this.props.api
      .put(`/cicles/${values.id}`, values)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro alterado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/cicles'), 2500);
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Err ao alterar o registro ${error.message}`
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
                <span className="panel-title">Alterar Ciclo</span>
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
                      value={this.state.list.id || ''}
                      type="hidden"
                    />
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
                      value={
                        formatDate(this.state.list.date_start, 'YYYY-MM-DD') ||
                          ''
                      }
                      label="Data início do save"
                      type="date"
                      required
                      rowClassName="col-sm-12"
                    />

                    <RenderIf expr={this.state.btnEnabled}>
                      <div className="form-group col-sm-12">
                        <Loading type="bars" color="#000000" />
                      </div>
                    </RenderIf>
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

export default withAuth({ isAdminPage: true })(CiclesEdit);

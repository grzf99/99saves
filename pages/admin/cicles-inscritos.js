import React from 'react';
import Link from 'next/link';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import ListTable from '../../components/admin/list-table-save-users';
import AlertMessage from '../../components/common/alert-message';
import RenderIf from '../../components/common/render-if';

import moment from 'moment';

class SavesSubscriptions extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      listSave: [],
      winnerProduct: [],
      showToast: false,
      messageToast: '',
      typeToast: ''
    };

    this.refresh = this.refresh.bind(this);
    this.getCicle = this.getCicle.bind(this);
  }

  componentDidMount() {
    this.getCicle(this.props.query.id);
    this.refresh();
  }

  getCicle(id) {
    this.props.api
      .get(`/cicles/${id}/cicle`)
      .then((response) => {
        console.log('cicle', response)
        this.setState({
          ...this.state,
          listSave: response.data,
          winnerProduct: response.data.winnerProduct
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

  refresh() {
    this.props.api
      .get(`/cicles/${this.props.query.id}/users`)
      .then((response) => {
        console.log('users', response)
        this.setState({ ...this.state, list: response.data.subscriptions });
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Problemas ao se comunicar com api: ${error.message}`
        });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      });
  }


  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                  <span className="panel-title">Lista de Inscritos no Save - (<b>{this.state.listSave.Save && this.state.listSave.Save.title}</b>) do Ciclo <b>{this.state.listSave.date_start && moment(this.state.listSave.date_start).format('DD/MM/YYYY')}</b></span>
              </div>

              <div className="panel-body">
                { this.state.winnerProduct &&
                  <RenderIf expr={this.state.listSave.checkoutOpen || this.state.listSave.finished}>
                    <div>
                      <div className="row">
                        <div className="col-lg-12">
                          <img src={this.state.winnerProduct.image_default} width="80"/>
                          <span className="panel-title">  Produto Vencedor - <b>{this.state.winnerProduct.title}</b></span>
                          <span/>
                        </div>
                      </div>
                      <div className="form-group"/>
                    </div>
                  </RenderIf>
                }
                <ListTable
                  list={this.state.list}
                />
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

export default withAuth({ isAdminPage: true })(SavesSubscriptions);

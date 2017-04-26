import React from 'react';
import 'isomorphic-fetch';
import Link from 'next/link';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import ListTable from '../../components/admin/list-table-providers';
import AlertMessage from '../../components/common/alert-message';

class Providers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      showToast: false,
      messageToast: '',
      typeToast: ''
    };

    this.refresh = this.refresh.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    this.props.api
      .get('/providers')
      .then((response) => {
        this.setState({ ...this.state, list: response.data.rows });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete(item) {
    this.props.api
      .delete(`/providers/${item.id}`)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro Excluido com Sucesso'
        });
        setTimeout(() => this.setState({ showToast: false }), 1500);
        this.refresh();
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Erro ao ecluir o registr: ${error}`
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
                <span className="panel-title">Lista de Fornecedores</span>
                <Link prefetch href="/admin/providers-create">
                  <a className="btn btn-xs btn-primary pull-right">Novo</a>
                </Link>
              </div>

              <div className="panel-body">
                <ListTable
                  list={this.state.list}
                  handleDelete={this.handleDelete}
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

export default withAuth({ isAdminPage: true })(Providers);

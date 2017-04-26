import React from 'react';
import Link from 'next/link';

import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import ListTable from '../../components/admin/list-table-saves';

class Saves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };

    this.refresh = this.refresh.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    this.props.api
      .get('/saves')
      .then((response) => {
        this.setState({ ...this.state, list: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete(save) {
    this.props.api
      .delete(`/saves/${save.id}`)
      .then(() => {
        this.refresh();
      })
      .catch((error) => {
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
                <span className="panel-title">Lista de Saves</span>
                <Link prefetch href="/admin/saves-create">
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
      </Layout>
    );
  }
}

export default withAuth({ isAdminPage: true })(Saves);

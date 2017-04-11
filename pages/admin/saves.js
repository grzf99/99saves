import React from 'react';
import 'isomorphic-fetch';
import Link from 'next/link';
import axios from 'axios';

import config from '../../config';
import Layout from '../../components/admin/layout';
import ListTable from '../../components/admin/list-table-saves';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };

    this.refresh = this.refresh.bind(this);
  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
    axios.get(`${config.API_URL}/saves`)
        .then((response) => {
          this.setState({ ...this.state, list: response.data.rows });
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
                <Link prefetch href='/admin/saves-create'><a className="btn btn-xs btn-primary pull-right">Novo</a></Link>
              </div>

              <div className="panel-body">
                <ListTable list={this.state.list} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

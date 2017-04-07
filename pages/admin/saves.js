import React from 'react';
import styled from 'styled-components';
import { modularScale } from 'polished';
import 'isomorphic-fetch';

import config from '../../config';
import Layout from '../../components/admin/layout';
import Line from '../../components/admin/line';
import Link from 'next/link';

export default class extends React.Component {
  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${config.API_URL}/saves`);
    const json = await res.json();
    return { json };
  }


  myTable = (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Imagem</th>
            <th>Title</th>
            <th>Description</th>
            <th>Data Início</th>
            <th>Data Término</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.json.rows.map(save => <Line {...save} key={save.id} />)
          }
        </tbody>
      </table>
    </div>
  )

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
                { this.myTable }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

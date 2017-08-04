import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hoc/withApi';
import moment from 'moment';

class AdminMenu extends Component {

  constructor() {
    moment.locale('pt-BR');
  }

  render() {
    return (
      <li className="dropdown user user-menu">

        <a href="#" className="dropdown-toggle" data-toggle="dropdown">

          <img src="/static/assets_admin/img/user2-160x160.jpg" className="user-image" alt="User Image"/>

          <span className="hidden-xs">{this.props.currentUser.name}</span>
        </a>
        <ul className="dropdown-menu">

          <li className="user-header">
            <img src="/static/assets_admin/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>

            <p>
              {this.props.currentUser}
              <small>Usuário desde {moment(this.props.currentUser.createdAt).format('MMM YY')}</small>
            </p>
          </li>

          <li className="user-body">
            <div className="row">
              <div className="col-xs-4 text-center">
                <a href="#">Followers</a>
              </div>
              <div className="col-xs-4 text-center">
                <a href="#">Sales</a>
              </div>
              <div className="col-xs-4 text-center">
                <a href="#">Friends</a>
              </div>
            </div>

          </li>

          <li className="user-footer">
            <div className="pull-left">
              <a href="#" className="btn btn-default btn-flat">Profile</a>
            </div>
            <div className="pull-right">
              <a href="/parceiro" className="btn btn-default btn-flat" onClick={this.props.onLogout}>Sair</a>
            </div>
          </li>
        </ul>
      </li>
    );
  }
}

export default withAuth()(AdminMenu);

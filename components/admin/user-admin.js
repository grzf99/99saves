import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hoc/withApi';

class UserAdmin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar-collapse pull-right col-sm-4">
        <p className="navbar-text navbar-right">
          <i className="glyphicon glyphicon-user" /> { this.props.name } - { this.props.email }
          ( <a href="/admin" className="navbar-link" onClick={this.props.onLogout}>Sair</a> )
        </p>
      </div>
    );
  }
}

export default withAuth()(UserAdmin);

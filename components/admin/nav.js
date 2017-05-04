import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {

  render() {
    return (
      <div id="top-nav" className="navbar navbar-inverse navbar-static-top">
        <div className="container bootstrap snippet">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="icon-toggle" />
            </button>
            <a className="navbar-brand" href="#/">99saves</a>
          </div>
          <div className="navbar-collapse pull-right col-sm-4">
            <p className="navbar-text navbar-right">
              <i className="glyphicon glyphicon-user" /> { this.props.current_user.name } - { this.props.current_user.email }
              ( <a href="#/" className="navbar-link" onClick={this.props.onLogout}>Sair</a> )
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  current_user: state.currentUser
}))(Nav);

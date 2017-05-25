import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAdmin from './user-admin';

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
          <UserAdmin name={this.props.currentUser.name} email= {this.props.currentUser.email} />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  currentUser: state.currentUser
}))(Nav);

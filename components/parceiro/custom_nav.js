import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminMenu from './admin_menu';

class CustomNav extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">

          <li className="dropdown messages-menu">

            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-envelope-o"></i>
              <span className="label label-success">4</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 4 messages</li>
              <li>

                <ul className="menu">
                  <li>

                    <a href="#">
                      <div className="pull-left">

                        <img src="/static/assets_admin/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                      </div>

                      <h4>
                        Support Team
                        <small>
                          <i className="fa fa-clock-o"></i>
                          5 mins</small>
                      </h4>

                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>

                </ul>

              </li>
              <li className="footer">
                <a href="#">See All Messages</a>
              </li>
            </ul>
          </li>



          <li className="dropdown notifications-menu">

            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-bell-o"></i>
              <span className="label label-warning">10</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 10 notifications</li>
              <li>

                <ul className="menu">
                  <li>

                    <a href="#">
                      <i className="fa fa-users text-aqua"></i>
                      5 new members joined today
                    </a>
                  </li>

                </ul>
              </li>
              <li className="footer">
                <a href="#">View all</a>
              </li>
            </ul>
          </li>

          <li className="dropdown tasks-menu">

            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-flag-o"></i>
              <span className="label label-danger">9</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 9 tasks</li>
              <li>

                <ul className="menu">
                  <li>

                    <a href="#">

                      <h3>
                        Design some buttons
                        <small className="pull-right">20%</small>
                      </h3>

                      <div className="progress xs">

                        <div className="progress-bar progress-bar-aqua" style={{width: "20%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span className="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>

                </ul>
              </li>
              <li className="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>

          <AdminMenu currentUser={this.props.currentUser}/>

          <li>
            <a href="#" data-toggle="control-sidebar">
              <i className="fa fa-gears"></i>
            </a>
          </li>
      </ul>
    );
  }
}

export default connect(state => ({
  currentUser: state.currentUser
}))(CustomNav);

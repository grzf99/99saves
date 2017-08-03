import React, { Component } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Menu from './menu';
import CustomNav from './custom_nav.js';
import moment from 'moment';

const Header = styled.header `

`

const Nav = styled.nav `
  background-color: #535853 !important;

  &>.sidebar-toggle {

    @media (min-width: 768px) {
      display: none;
    }

    color: #FFF !important;
    border-right: none !important;

    &:hover {
      color: #000 !important;
    }
  }

  &>.navbar-custom-menu {
    &>.navbar-nav {
      &>li {
        &>a {
          color: #FFF !important;
          border-left: none !important;

          &:hover {
            color: #000 !important;
          }
        }
      }
    }
  }
`

const Logo = styled.a `
  background-color: #1d2028 !important;
  border: none !important;
`

export default function withLayout(
  title,
  description,
) {
  return (Page) => {
    class Layout extends Component {
      render() {
        return (
          <div>
            <Head>
              <title>Painel de administração</title>

              <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>

              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"/>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"/>
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>

              <link rel="stylesheet" href="/static/assets_admin/css/AdminLTE.min.css"/>
              <link rel="stylesheet" href="/static/assets_admin/css/skins/skin-black-light.min.css"/>
            </Head>

            <div className="wrapper">

              <Header className="main-header">
                <Logo href="index2.html" className="logo">

                  <span className="logo-lg">
                    <img src="/static/images/logo-99-saves.svg"/>
                  </span>
                </Logo>

                <Nav className="navbar navbar-static-top" role="navigation">

                  <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                  </a>

                  <div className="navbar-custom-menu">
                    <CustomNav/>
                  </div>
                </Nav>
              </Header>

              <aside className="main-sidebar">
                <section className="sidebar">
                  <Menu/>
                </section>
              </aside>

              <div className="content-wrapper">
                <section className="content-header">
                  <h1>
                    {title}
                    <small>{description}</small>
                  </h1>
                </section>
                <section className="content container-fluid">
                  <Page/>
                </section>
              </div>

              <footer className="main-footer">

                <div className="pull-right hidden-xs">
                  Vamos negociar juntos
                </div>

                <strong>Copyright &copy; {moment(new Date()).format('YYYY')} <a href="http://99saves.com">99saves.com</a>.</strong>
              </footer>

              <aside className="control-sidebar control-sidebar-dark">

                <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
                  <li className="active">
                    <a href="#control-sidebar-home-tab" data-toggle="tab">
                      <i className="fa fa-home"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#control-sidebar-settings-tab" data-toggle="tab">
                      <i className="fa fa-gears"></i>
                    </a>
                  </li>
                </ul>

                <div className="tab-content">

                  <div className="tab-pane active" id="control-sidebar-home-tab">
                    <h3 className="control-sidebar-heading">Recent Activity</h3>
                    <ul className="control-sidebar-menu">
                      <li>
                        <a href="javascript:;">
                          <i className="menu-icon fa fa-birthday-cake bg-red"></i>

                          <div className="menu-info">
                            <h4 className="control-sidebar-subheading">Langdon's Birthday</h4>

                            <p>Will be 23 on April 24th</p>
                          </div>
                        </a>
                      </li>
                    </ul>


                    <h3 className="control-sidebar-heading">Tasks Progress</h3>
                    <ul className="control-sidebar-menu">
                      <li>
                        <a href="javascript:;">
                          <h4 className="control-sidebar-subheading">
                            Custom Template Design
                            <span className="pull-right-container">
                              <span className="label label-danger pull-right">70%</span>
                            </span>
                          </h4>

                          <div className="progress progress-xxs">
                            <div className="progress-bar progress-bar-danger" style={{width: "70%"}}></div>
                          </div>
                        </a>
                      </li>
                    </ul>


                  </div>


                  <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>


                  <div className="tab-pane" id="control-sidebar-settings-tab">
                    <form method="post">
                      <h3 className="control-sidebar-heading">General Settings</h3>

                      <div className="form-group">
                        <label className="control-sidebar-subheading">
                          Report panel usage
                          <input type="checkbox" className="pull-right" checked/>
                        </label>

                        <p>
                          Some information about this general settings option
                        </p>
                      </div>

                    </form>
                  </div>

                </div>
              </aside>
              <div className="control-sidebar-bg"></div>
            </div>

            <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossOrigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
            <script src="/static/assets_admin/js/adminlte.min.js"></script>

          </div>
        )
      }
    }

    return Layout;
  }
}

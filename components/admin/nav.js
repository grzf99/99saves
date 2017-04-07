export default () => (
  <div id="top-nav" className="navbar navbar-inverse navbar-static-top">
    <div className="container bootstrap snippet">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-toggle" />
        </button>
        <a className="navbar-brand" href="#/">99saves</a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">

          <li className="dropdown">
            <a className="dropdown-toggle" role="button" data-toggle="dropdown" href="#/">
              <i className="glyphicon glyphicon-user" /> Admin <span className="caret" /></a>
            <ul id="g-account-menu" className="dropdown-menu" role="menu">
              <li><a href="#/">My Profile</a></li>
              <li><a href="#/"><i className="glyphicon glyphicon-lock" /> Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

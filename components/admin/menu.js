import Link from 'next/link';

export default () => (
  <ul className="nav nav-pills nav-stacked">
    <li><Link prefetch href='/admin'><a>Dashboard</a></Link></li>
    <li><Link prefetch href='/admin/saves'><a>Saves</a></Link></li>
    {/*<li><a href="#/"><i className="glyphicon glyphicon-link" /> Links</a></li>
    <li><a href="#/"><i className="glyphicon glyphicon-list-alt" /> Reports</a></li>
    <li><a href="#/"><i className="glyphicon glyphicon-book" /> Books</a></li>
    <li><a href="#/"><i className="glyphicon glyphicon-briefcase" /> Tools</a></li>
    <li><a href="#/"><i className="glyphicon glyphicon-time" /> Real-time</a></li>
    <li><a href="#/"><i className="glyphicon glyphicon-plus" /> Advanced..</a></li>*/}
  </ul>
);

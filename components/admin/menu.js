import Link from 'next/link';

export default () => (
  <ul className="nav nav-pills nav-stacked">
    <li><Link prefetch href="/admin"><a>Dashboard</a></Link></li>
    <li><Link prefetch href="/admin/saves"><a>Saves</a></Link></li>
    <li><Link prefetch href="/admin/providers"><a>Fornecedores</a></Link></li>
    <li><Link prefetch href="/admin/products"><a>Produtos</a></Link></li>
    <li><Link prefetch href="/admin/users"><a>Users</a></Link></li>
  </ul>
);

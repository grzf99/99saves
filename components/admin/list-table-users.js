import moment from 'moment';
import Link from 'next/link';
import { format } from 'date-fns';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{ item.id }</td>
        <td>{ item.name ? item.name : item.Profile.name }</td>
        <td>{ item.email }</td>
        <td>{ item.admin ? 'Administrador' : 'Usuário' }</td>
        <td>
          {item.createdAt
            ? format(new Date(item.createdAt), 'DD/MM/YYYY HH:mm')
            : ''}
        </td>
        <td>
          <Link prefetch href={`/admin/users-edit?id=${item.id}`}>
            <a className="">Editar</a>
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Data do Cadastro</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            renderRows()
          }
        </tbody>
      </table>
    </div>
  );
};

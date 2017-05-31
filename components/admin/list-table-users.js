import moment from 'moment';
import Link from 'next/link';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{ item.id }</td>
        <td>{ item.name ? item.profile.name : item.name }</td>
        <td>{ item.email }</td>
        <td>{ item.admin ? 'Administrador' : 'Usuário' }</td>
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

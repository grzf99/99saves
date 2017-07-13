import { format } from 'date-fns';
import Link from 'next/link';
import { getSaveStatus } from '../../utils';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td width="30">
          {item.image_default
            ? <img alt={item.title} src={item.image_default} width="25" />
            : ''}
        </td>
        <td>{item.title}</td>
        <td>
          <Link prefetch href={`/admin/saves-edit?id=${item.id}`}>
            <a className="">Editar</a>
          </Link>
        </td>
        <td>
          <button
            className="btn btn-xs btn-danger"
            onClick={() => {
              if (confirm('Tem certeza que deseja excluir?')) {
                props.handleDelete(item);
              }
            }}
          >
            Excluir
          </button>
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
            <th />
            <th>Title</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

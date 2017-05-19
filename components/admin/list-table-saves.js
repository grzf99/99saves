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
        <td>{getSaveStatus(item.status)}</td>
        <td>
          {item.date_start
            ? format(new Date(item.date_start), 'DD/MM/YYYY')
            : ''}
        </td>
        <td>
          {item.date_end ? format(new Date(item.date_end), 'DD/MM/YYYY') : ''}
        </td>
        <td>
          {item.negotiation_end
            ? format(new Date(item.negotiation_end), 'DD/MM/YYYY')
            : ''}
        </td>
        <td>
          {item.votation_end
            ? format(new Date(item.votation_end), 'DD/MM/YYYY')
            : ''}
        </td>
        <td>
          {item.checkout_end
            ? format(new Date(item.checkout_end), 'DD/MM/YYYY')
            : ''}
        </td>
        <td>
          {(item.checkoutOpen || item.finished) ? 
            <Link prefetch href={`/admin/saves-inscritos?id=${item.id}`}>
              <a className="">Inscritos</a>
            </Link>
          : ''
          }
          
        </td>
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
            <th>status</th>
            <th>Início</th>
            <th>Tér. Adessão</th>
            <th>Tér. Negociação</th>
            <th>Tér. Votação</th>
            <th>Tér. Compra</th>
            <th />
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

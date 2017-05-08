import moment from 'moment';
import Link from 'next/link';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{ item.id }</td>
        <td width="30">{(item.image_default) ? <img alt={item.title} src={item.image_default} width="25" /> : ''}</td>
        <td>{ item.title }</td>
        <td>
          { ( moment() > moment(item.date_start) && moment() <= moment(item.date_end) ? 'Adessão' : '') }
          { ( moment() > moment(item.date_end) && moment() <= moment(item.votation_end) ? 'Votação' : '') }
          { ( moment() > moment(item.votation_end) && moment() <= moment(item.checkout_end) ? 'Compra' : '') }
          { ( moment() > moment(item.checkout_end) ? 'Finalizado' : '') }
        </td>
        <td>{ (item.date_start) ? moment(item.date_start).format('DD/MM/YYYY') : ''}</td>
        <td>{ (item.date_end) ? moment(item.date_end).format('DD/MM/YYYY') : ''}</td>
        <td>{ (item.votation_end) ? moment(item.votation_end).format('DD/MM/YYYY') : ''}</td>
        <td>{ (item.checkout_end) ? moment(item.checkout_end).format('DD/MM/YYYY') : ''}</td>
        <td>
          <Link prefetch href={`/admin/saves-edit?id=${item.id}`}>
            <a className="">Editar</a>
          </Link>
        </td>
        <td>
          <button
            className="btn btn-xs btn-danger"
            onClick={() => { if (confirm('Tem certeza que deseja excluir?')) { props.handleDelete(item); } }}
          >Excluir</button>
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
            <th></th>
            <th>Title</th>
            <th>status</th>
            <th>Início</th>
            <th>Tér. Adessão</th>
            <th>Tér. Votação</th>
            <th>Tér. Compra</th>
            <th />
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

import moment from 'moment';
import Link from 'next/link';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{ item.id }</td>
        <td>{(item.image_default) ? <img alt={item.title} src={item.image_default} width="40" /> : ''}</td>
        <td>{ item.title }</td>
        <td>{ item.description }</td>
        <td>{ (item.date_start) ? moment(item.date_start).format('DD/MM/YYYY') : ''}</td>
        <td>{ (item.date_end) ? moment(item.date_end).format('DD/MM/YYYY') : ''}</td>
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
            <th>Imagem</th>
            <th>Title</th>
            <th>Description</th>
            <th>Data Início</th>
            <th>Data Término</th>
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

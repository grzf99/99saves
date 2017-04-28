import moment from 'moment';
import Link from 'next/link';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{ item.id }</td>
        <td>{ item.key }</td>
        <td>{ item.Subscription.Save.title }</td>
        <td>{ item.Product.title }</td>
        <td>{ item.used? 'Utilizado' : 'Não utilizado' }</td>
        <td>
          <Link prefetch href={`/admin/coupons-edit?id=${item.id}`}>
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
            <th>Cupom</th>
            <th>Save</th>
            <th>Produto</th>
            <th>Utilizado</th>
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
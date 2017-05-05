import moment from 'moment';
import Link from 'next/link';
import { formatCurrency } from '../../utils';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{ item.id }</td>
        <td>{ item.Save.title }</td>
        <td>{ item.Provider.name }</td>
        <td>{ item.title }</td>
        <td>R$ { formatCurrency(item.price) }</td>
        <td>{(item.image_default) ? <img alt={item.title} src={item.image_default} width="40" /> : ''}</td>
        <td>
          <Link prefetch href={`/admin/products-show?id=${item.id}`}>
            <a className="">Ver tudo</a>
          </Link>
        </td>
        <td>
          <Link prefetch href={`/admin/products-edit?id=${item.id}`}>
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
            <th>Save</th>
            <th>Fabricante</th>
            <th>Título</th>
            <th>Preço</th>
            <th>Imagem</th>
            <th />
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

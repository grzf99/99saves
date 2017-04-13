import Link from 'next/link';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.id}>
        <td>{ item.id }</td>
        <td>{(item.logo) ? <img alt={item.title} src={item.logo} width="40" /> : ''}</td>
        <td>{ item.name }</td>
        <td>{ item.cnpj }</td>
        <td>{ item.responsible }</td>
        <td>{ item.phone }</td>
        <td>
          <Link prefetch href={`/admin/providers-edit?id=${item.id}`}>
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
            <th />
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Responsável</th>
            <th>Telefone</th>
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

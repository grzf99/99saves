import moment from 'moment';
import Link from 'next/link';

export default (props) => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(item => (
      <tr key={item.User.id}>
        <td>{ item.User.Profile.name }</td>
        <td>{ item.User.email }</td>
        <td>{ item.User.Profile.cpf }</td>
        <td>{ item.User.Profile.state }</td>
        <td>{ item.User.Profile.city }</td>
        <td>{ item.User.Profile.city }</td>
        <td>
          {item.createdAt
            ? format(new Date(item.createdAt), 'DD/MM/YYYY HH:mm')
            : ''}
        </td>
        <td>{ item.Coupon && item.Coupon.key }</td>
      </tr>
    ));
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>UF</th>
            <th>Cidade</th>
            <th>Data da Inscrição</th>
            <th>Cupom</th>
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

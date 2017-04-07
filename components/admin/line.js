import Link from 'next/link';
import moment from 'moment';

export default (props) => (
  <tr >
    <td>{ props.id }</td>
    <td>{(props.image_default) ? <img src={ props.image_default } width="40" /> : ""}</td>
    <td>{ props.title }</td>
    <td>{ props.description }</td>
    <td>{ (props.date_start) ? moment(props.date_start).format('DD/MM/YYYY') : ""}</td>
    <td>{ (props.date_end) ?  moment(props.date_end).format('DD/MM/YYYY') : ""}</td>
    {/*<td>
      <Link prefetch href='/admin/saves-create'><a className="">Editar</a></Link>
    </td>
    <td>
      <button alt={props.id} className="" onClick={() => props.handleDelete}>Excluir</button>
    </td>*/}
  </tr>
);

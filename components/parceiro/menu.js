import Link from 'next/link';

export default () => (
  <ul className="sidebar-menu" data-widget="tree">
    <li className="header">HEADER</li>

    <li className="active">
      <a href="#">
        <i className="fa fa-file-o"></i>
        <span>Cadastrar produto</span>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-usd"></i>
        <span>Propor Oferta</span>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-link"></i>
        <span>Saves em Aberto</span>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-history"></i>
        <span>Historico de Saves</span>
      </a>
    </li>
  </ul>
);

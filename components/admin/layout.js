import Head from 'next/head';
import Nav from './nav';
import Menu from './menu';

/**
 * TODO
 * É extremamente importante encontrar uma forma de importar os pacotes do bootstrap pelo NPM,
 * pra aproveitar o SSR, tem algo que pode servir no link:
 * https://github.com/styled-components/styled-components.github.io#adding-bootstrap
 */
export default props => (
  <div>
    <Head>
      <title>Painel de administração</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous" />
    </Head>

    <Nav />

    <div className="container bootstrap snippet">

      <div className="row">
        <div className="col-md-3">
          <a href="#/">
            <strong><i className="glyphicon glyphicon-briefcase" /> Menu</strong>
          </a>
          <hr />

          <Menu />

          <hr />
        </div>
        <div className="col-md-9">
          { props.children }
        </div>
      </div>
    </div>
  </div>
);

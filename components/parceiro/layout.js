import Head from 'next/head';
import { Layout } from 'reactjs-admin-lte';

/**
 * TODO
 * É extremamente importante encontrar uma forma de importar os pacotes do bootstrap pelo NPM,
 * pra aproveitar o SSR, tem algo que pode servir no link:
 * https://github.com/styled-components/styled-components.github.io#adding-bootstrap
 */
export default props => (
  <div>
    <Head>
      <title>99saves - Painel administrativo</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous" />
    </Head>

    <Layout skin='green'>
        { props.children }
    </Layout>
  </div>
);

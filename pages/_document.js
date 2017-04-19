import Document, { Head, Main, NextScript } from 'next/document';
import { injectGlobal } from 'styled-components';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import reset from '../components/common/reset';

injectGlobal`${reset}`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = (
      <style dangerouslySetInnerHTML={{ __html: styleSheet.rules().map(rule => rule.cssText).join('\n') }} />
    );
    return { ...page, styles };
  }

  render() {
    return (
      <html lang="pt-BR">
        <Head>
          <title>99saves</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,700" rel="stylesheet" />

          <script
            dangerouslySetInnerHTML={{ __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : ${process.env.CLIENT_ID},
                  xfbml      : true,
                  version    : 'v2.8'
                });
                FB.AppEvents.logPageView();
              };

              (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            ` }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

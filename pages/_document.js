import Document, { Head, Main, NextScript } from 'next/document';
import { injectGlobal } from 'styled-components';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import reset from '../components/common/reset';

injectGlobal`${reset}`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = (
      <style
        dangerouslySetInnerHTML={{
          __html: styleSheet.rules().map(rule => rule.cssText).join('\n')
        }}
      />
    );
    return { ...page, styles };
  }

  render() {
    return (
      <html lang="pt-BR">
        <Head>
          <title>99saves</title>
          <meta property="og:locale" content="pt_BR"/>

          <meta property="og:url" content={process.env.APP_URL}/>

          <meta property="og:title" content="99saves.com – Juntos pelo melhor preço!"/>

          <meta property="og:description" content="A primeira plataforma de negociação direta entre consumidores e fabricantes."/>

          <meta property="og:image" content={process.env.APP_URL + '/static/images/og-image.png'}/>


          <meta property="fb:app_id"                 content={process.env.FACEBOOK_APP_ID} />

          <meta property="og:type" content="website" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <meta name="Title" content="99saves"/>
          <meta name="Keywords" content="compras, 99saves, preço baixo, melhor preço, produtos, ofertas"/>
          <meta name="Description" content="A primeira plataforma de negociação direta entre consumidores e fabricantes."/>
          <meta name="Subject" content="A primeira plataforma de negociação direta entre consumidores e fabricantes."/>
          <meta name="Language" content="Brasil"/>

          <link
            rel="shortcut icon"
            type="image/png"
            href="/static/images/favicon.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,700"
            rel="stylesheet"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : ${process.env.FACEBOOK_APP_ID},
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
            `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var e=this.createElement("script");n&&(this.domain=n),e.id="js-iframe-async",e.src="https://assets.zendesk.com/embeddable_framework/main.js",this.t=+new Date,this.zendeskHost="99saves.zendesk.com",this.zEQueue=a,this.body.appendChild(e)},o.write('<body onload="document._l();">'),o.close()}();
            `
            }}
          />
         <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-97438126-1', 'auto');ga('send', 'pageview');
            `
            }}
          />
        </body>
      </html>
    );
  }
}

import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import { savesMapper } from '../utils';
import withApi from '../components/hoc/withApi';
import { colors } from '../components/styles/variables';
import { Heading } from '../components/common/typography';
import Button from '../components/common/button';
import Toolbar from '../components/toolbar';
import Card from '../components/card';
import Footer from '../components/footer';
import Toast from '../components/common/toast';
import Container from '../components/common/container';
import LoginModal from '../components/auth/login-modal';
import Modal from '../components/common/modal';
import RenderIf from '../components/common/render-if';
import SubscriptionConfirmationModal
  from '../components/saves/subscription-confirmation-modal';

const Page = styled.div`
  background: ${colors.white};
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const PageContainer = styled(Container)`
  background: ${colors.white};
  font-family: 'Roboto';
  font-size: 12px;
  padding: 20px 60px 60px;
  text-align: justify;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  color: ${colors.dark};
  font-family: Oswald;
  font-size: 36px;
  font-weight: 500;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.div`
  color: ${colors.gray};
  font-family: Roboto;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  max-width: 670px;
  width: 100%;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Page>

        <Toolbar
            logged={this.props.isSignedIn}
            onLogout={this.props.onLogout}
          />

        <PageContainer>
          <Title>Política de Privacidade</Title>
          <Subtitle>Última atualização em 02 de maio de 2017</Subtitle>
          <p>www.99saves.com (incluindo aplicativos, serviços eletrônicos e sites em redes sociais correlatos -
coletivamente, o "Site") é um serviço da empresa 99SAVES.COM LTDA., doravante denominado
"99saves.com". Esta Política de Privacidade regula o seu consentimento para o uso de seus dados
pelo 99saves.com e aplica-se a todos que usam o nosso serviço.</p>

          <p>Ao utilizar o Site, você concorda e consente com os termos desta Política de Privacidade. Caso
você não consinta e não esteja de acordo com as práticas descritas nesta Política de Privacidade,
por favor não nos forneça seus dados pessoais e não interaja no Site.</p>

          <p>Nós nos reservamos o direito de alterar esta Política de Privacidade a qualquer tempo. Caso sejam
feitas alterações substanciais a esta política, nós lhe notificaremos por e-mail (conforme
especificado em sua conta) ou pelo Site antes da alteração entrar em vigor. Você pode verificar
quando esta Política de Privacidade foi revisada pela última vez verificando a data indicada no
início desta Política.</p>
          <p>1.Nós coletamos Dados Pessoais e outros Dados Não Pessoalmente Identificáveis pelo Site e quando você interage conosco, incluindo quando você se cadastra no Site, cria uma conta com o 99saves.com, abre ou responde nossos e-mails, inscreve-se para receber nossa newsletter, entra em contato com nosso serviço de atendimento ao cliente, adquire produtos ou serviços pelo Site, posta comentários em nossas páginas e Comunidades Online, fornece informações a nossos Parceiros ou Fornecedores, fornece dados para participar de programas de Parceiros, visita qualquer página online que exiba nossos anúncios ou conteúdos ou conecta-se ao Site diretamente ou por meio de redes sociais. Os Dados Pessoais que coletamos incluem ,mas sem limitação, seu nome e Dados de Contato.</p>

          <p>2. Utilizamos e processamos seus Dados Pessoais para fins de viabilizar seu uso do Site, sua
aquisição de produtos e serviços pelo Site, para envio de publicidade do 99saves.com para você,
incluindo ofertas com base em seus interesses declarados ou na sua localização, para a operação,
manutenção e melhoria do Site e dos nossos serviços, para facilitar e viabilizar suas compras no
Site, para avaliar se você é elegível para determinadas ofertas, produtos ou serviços que possam
ser de seu interesse, para analisar a eficiência de determinada publicidade, para responder e
analisar seus questionamentos, para fazer análise (analytics) e pesquisa de clientela, para lhe
enviar informações técnicas, atualizações, alertas de segurança e mensagens de suporte e
administrativas, para a administração de pesquisas, concursos, sorteios ou outras atividades
promocionais, para o gerenciamento de nossas necessidades de negócio usuais, como prevenção
de fraudes, gerenciamento de fóruns de discussão e cumprimento da legislação, para permitir que
você poste um vídeo ou comentário, ou se inscreva para receber ofertas ou publicidade de
terceiros, incluindo Parceiros do 99saves.com, por meio do Site ou de outros programas ou fonte, e
para nos ajudar a entender melhor a sua necessidade para direcionarmos ofertas.</p>

<p>VOCÊ NESTE ATO EXPRESSAMENTE AUTORIZA E CONSENTE COM A COLETA DE SEUS DADOS
PESSOAIS CONFORME INDICADO ACIMA, PARA PROCESSAMENTO E USO PARA AS FINALIDADES
ACIMA INDICADAS, INCLUSIVE PARA FINS DE ENVIO DE PUBLICIDADE DO 99SAVES.COM.</p>

<p>3. Nós poderemos compartilhar e transferir seus Dados Pessoais a terceiros nas seguintes hipóteses: (i) para os nossos Fornecedores, para que nos prestem serviços ou forneçam produtos, e sempre sujeitos à obrigação de sigilo; (ii) para os nossos Parceiros relevantes, para a oferta de produtos ou serviços no Site, para facilitar um relacionamento direto com você, viabilizar a comunicação com você, uma oferta, um concurso ou programa que você escolha participar, ou na medida em que você tenha comprado um produto ou serviço ou tenha um cupom do 99saves.com para utilizar com esse Parceiro; (v) com um terceiro que adquira ou pretenda adquirir o 99saves.com ou o todo ou parte de seus ativos; (iii) para cumprimento da legislação aplicável, de ordem judicial ou ordem de qualquer autoridade administrativa ou policial, ou conforme necessário para dar suporte a auditorias ou investigações de compliance ou corporativas, ou para a defesa judicial ou administrativa do 99saves.com; (iv) para combater fraudes ou atividades criminais, e para proteger nossos direitos ou os direitos de Parceiros; e (v) para qualquer outra finalidade mediante seu consentimento.</p>

<p>3.1. Transferências de Negócios ou Mudanças Societárias. O 99saves.com reserva-se o direito de divulgar, transferir ou licenciar todas e quaisquer informações relativas ao Site, incluindo Dados Pessoais: para um proprietário, co-proprietário ou operador subsequente de um ou mais dos Sites ou de qualquer porção ou operação relativa a parte de um ou mais dos Sites; ou em relação a uma fusão, consolidação, ou restruturação, venda de substancialmente todas as nossas ações ou ativos, ou outra mudança societária, incluindo, mas sem limitação, durante o curso de qualquer procedimento de auditoria (due diligence).</p>

<p>VOCÊ NESTE ATO EXPRESSAMENTE AUTORIZA E CONSENTE COM A TRANSFERÊNCIA,
PROCESSAMENTO E USO DE SEUS DADOS PESSOAIS PELOS TERCEIROS CONFORME INDICADO
ACIMA.</p>

<p>4. Utilizamos Cookies em diferentes partes do Site para tornar a visita ao nosso Site mais atraente e
possibilitar o uso de certas funções. Cookies são pequenos arquivos de texto que são armazenados
em seu computador. A maioria dos Cookies utilizados em nosso Site será apagada do seu disco
rígido automaticamente ao encerrar a sessão do navegador (chamados Cookies de sessão). Outros
tipos de Cookies permanecerão no seu computador e possibilitam a identificação do seu
computador na próxima visita ao nosso Site (chamados Cookies permanentes). O 99saves.com
utiliza, ainda, diferentes sistemas de tracking de terceiros, como por exemplo o Google Analytics,
um serviço de análise de internet da Google Inc. O Google Analytics utiliza Cookies (arquivos de
texto) que são armazenados em seu computador e possibilitam a análise de utilização do Site. As
informações geradas a partir dos Cookies a respeito da utilização do Site (incluindo o seu endereço
IP) serão transmitidos a um servidor nos Estados Unidos e lá armazenados. O Google Inc. utilizará
essas informações para analisar a utilização do Site, para fornecer relatórios sobre a utilização aos
operadores de sites, bem como o fornecimento de outros serviços ligados à utilização do Site e da
internet. O Google Inc. transmitirá também essas informações a terceiros, caso seja imposto por lei
ou no caso em que o terceiro processe esses dados por ordem do Google Inc.</p>

<p>Você pode impedir a instalação de Cookies configurando seu navegador. Avisamos que neste caso
a totalidade das funções do Site não estará disponível.</p>

<p>VOCÊ NESTE ATO EXPRESSAMENTE AUTORIZA E CONSENTE COM COLETA E PROCESSAMENTO DE
DADOS POR MEIO DE COOKIES E PELO GOOGLE INC. NA FORMA DESCRITA ACIMA.</p>

<p>5. VOCÊ NESTE ATO EXPRESSAMENTE AUTORIZA E CONSENTE COM A COLETA, PROCESSAMENTO E
UTILIZAÇÃO DE SEUS DADOS PESSOAIS PARA FINS DE PUBLICIDADE DO 99SAVES.COM. Você pode
cancelar o seu consentimento para recebimento de publicidade a qualquer tempo através de
solicitação pelo atendimento@99saves.com. Não disponibilizaremos seus dados para fins de
publicidade a terceiros, a menos que você nos autorize expressamente no Site. Ao se registrar para
receber a newsletter de uma cidade, seu endereço de e-mail será utilizado para fins de publicidade
até o momento de cancelamento desta newsletter. O cancelamento da newsletter é possível a
qualquer tempo através do link que acompanha seu e-mail contendo a newsletter.</p>

<p>6. Nos termos da legislação aplicável, armazenamos o texto do contrato e lhe enviamos um resumo
de suas compras e as nossas condições gerais de venda por e-mail. Nossas condições gerais de
venda podem ser consultadas on-line pelo site www.99saves.com.</p>

<p>7. Segurança de Dados Pessoais. O 99saves.com implementou um programa de segurança da
informação que contém controles administrativos, técnicos e físicos que são pensados para
resguardar os dados pessoais. Entretanto, por favor note que nenhum método de transmissão pela
Internet ou método de armazenamento é 100% seguro. Portanto, não podemos garantir de forma
absoluta a segurança dos dados. Se você tem alguma dúvida quanto a segurança dos Dados
Pessoais, por favor entre em contato conosco através da Central de Ajuda no Atendimento ao
Cliente, dentro de sua área de cadastro no Site ou através do atendimento@99saves.com.</p>

<p>8. Nos termos da legislação aplicável, você tem direito, a qualquer tempo, de acessar, atualizar e
eventualmente corrigir ou excluir seus dados pessoais que nós armazenamos, ressalvado nosso
direito de manter determinados dados na medida do necessário para nosso cumprimento da
legislação aplicável. Para tais finalidades, por favor entre em contato conosco através da Central de
Ajuda no Atendimento ao Cliente, dentro de sua área de cadastro no Site ou através do
atendimento@99saves.com.</p>

<p>9. Quando utilizados nesta Política de Privacidade, os termos abaixo definidos terão o significado aqui atribuídos:</p>

<p>Comunidade Online: significa, coletivamente, nossas páginas ou contas em redes sociais, fóruns,
plataformas, grupos de discussão, salas de chat ou outros métodos de comunicação que possam
ser oferecidos ou conectados por link ao Site.</p>

<p>Cookie: significa um identificador único, geralmente consistente em pequenas partes de texto ou
código. Para mais informações, por favor acesse nossa Política de Cookies.</p>

<p>Dados Pessoais: significa informações sobre você que especificamente lhe identifiquem ou que,
quando combinadas com outras informações que tivermos, possam ser utilizadas para identificar
você. Isso inclui os seguintes tipos de informações: Dados de Contato, Dados de Relacionamento,
Dados de Transação e Dados Financeiros.</p>

<p>Dados de Contato: significa seu nome, endereços, endereços de e-mail, nomes de usuários em
contas de redes sociais, números de telefone, ou outros endereços em que você possa receber comunicações.</p>

<p>Dados de Relacionamento: significa informações que você forneça que nos permitam determinar estilo de vida, interesses e atividades, incluindo informações de localização relativas ao seu Estado, cidade ou vizinhança, áreas de interesse, os tipos de anúncios que lhe interessem, informações
coletadas por meio de suas inteirações com redes sociais, dados demográficos (ex: data de
nascimento, idade, gênero), informações sobre pessoas para as quais você tenha adquirido ofertas
do 99saves.com como um presente, ou que tenham adquirido ofertas do 99saves.com como
presente a você, e informações sobre amigos que lhe indiquem ou que você tenha indicado.</p>

<p>Dados de Transação: significa informações que você forneça quando você interage conosco e com
o Site, tais como as ofertas do 99saves.com que lhe interessem, ou que você adquira ou utilize, email
e outras comunicações; e como você interage com nossos Parceiros e nossos Fornecedores.</p>

<p>Dados do Equipamento: significam informações relativas e um equipamento que você use para
acessar, utilizar ou interagir com o Site, tais como tipo de sistema operacional ou modelo de
aparelho móvel, tipo de browser, domínio e outras configurações de sistema, a linguagem que o
seu sistema usa, e o país e fuso horário de seu equipamento, geo-localização, identificador de
equipamento único ou outro identificador de equipamento, identificador da operadora de celular,
e informação sobre a plataforma de software do equipamento ou firmware.</p>

<p>Dados Financeiros: significa informações coletadas de você conforme necessário para processar
pagamentos para participação dos saves do 99saves.com ou outros produtos ou serviços que você
adquira, ou conforme sejam fornecidas por você para administrar sua participação em serviços ou
programas opcionais, tais como o número de seu cartão de pagamento, data de validade, e
número de verificação do cartão.</p>

<p>Dados Não Pessoalmente Identificáveis: significam informações que isoladamente não podem
identificar você, incluindo dados de Cookies, Pixel Tags e Web Beacons, e Dados do Equipamento.
Dados Não Pessoalmente Identificáveis podem ser derivados de Dados Pessoais.</p>

<p>Fornecedores: significa, coletivamente, terceiros que realizem operações de negócio por conta do
99saves.com, tais como transações de processamento, venda, faturamento, mensagens, serviços
de comunicação (e-mail, mensagens diretas, etc), marketing, processamento de dados e analytics,
serviços, cobranças ou gerenciamento de anúncios.</p>

<p>Parceiro: significa, coletivamente, terceiros com os quais nós fazemos negócio, tais como
anunciantes, co-anunciantes, distribuidores e revendedores.</p>

<p>Pixel Tags e Web Beacons: significa minúsculas imagens gráficas colocadas em páginas de websites
ou em nossos e-mails que nos permitem determinar se você realizou ou não ações específicas.</p>
        </PageContainer>
        <Footer marginTop />
      </Page>
    );
  }
}

export default withApi()(Index);

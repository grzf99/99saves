import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import { savesMapper } from '../utils';
import { USER_LOCALSTORAGE_KEY } from '../store/auth';
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
          <Title>99SAVES.COM LTDA</Title>
          <Subtitle>POLÍTICA DE CONSUMO 99SAVES</Subtitle>

          <p>Prezados Consumidores,</p>
          <p>Nós do 99saves.com, retribuindo a confiança depositada em nossos serviços, com total transparência e respeito a você, consumidor, apresentamos abaixo nossa Política de Consumo.</p>

          <p>É importante realizar uma leitura atenta deste documento, pois diversas dúvidas e perguntas frequentes podem ser esclarecidas no texto abaixo. Além disso, a participação nos Saves da plataforma do 99saves.com (http://www.99saves.com) (“Plataforma”) implica na aceitação das regras aqui descritas.</p>

          <p>Para uma busca rápida, navegue pelos tópicos, que foram distribuídos pensando em uma leitura objetiva e descomplicada.</p>

          <p>Uma dica: antes de realizar qualquer participação, leia também as regras específicas aplicáveis a cada oferta, principalmente com relação aos prazos e condições de utilização. Lembramos que, mesmo tendo um departamento de qualidade (que analisa e avalia cada Anunciante que divulga ofertas no 99saves.com), é importante que você o conheça, afinal, você fará um negócio com essa empresa também. Em caso de dúvidas, nosso Sistema de Atendimento ao Consumidor – SAC terá o prazer de atendê-lo, prontamente, nos telefones (11) 3042-1099 ou no e-mail atendimento@99saves.com.</p>

          <p>Boa leitura!</p>
          
          <p></p>

          <p>I. ESCLARECIMENTOS GERAIS:</p>

          <p>1. O QUE É O 99SAVES.COM?</p>

          <p>O 99saves.com é a primeira plataforma de negociação direta entre consumidores e fabricantes. Temos um time inteiramente dedicado em trazer a, você, consumidor os melhores preços do mercado! O 99SAVES.COM nasceu da ideia de que há inúmeras pessoas buscando os mesmos produtos e serviços no mercado que você, consumidor, e que você desconhece. O 99SAVES.COM dá a você, consumidor, o mesmo poder de barganha que um grande varejista. Como consequência, o 99SAVES.COM leva a você os melhores produtos do mercado a preços irresistíveis! O 99SAVES.COM quer tornar a vida de vocês, consumidores, mais simples, mais divertida e econômica.
          Para que isso aconteça, temos como princípio básico tratar você como gostaríamos de ser tratados. Por esse motivo, selecionamos com muito critério os nossos fornecedores (que promovem ofertas em nosso site). Não queremos vender pegadinhas, ilusões ou problemas. Nós estamos verdadeiramente comprometidos em oferecer a você o que houver de melhor no que se refere a custo x benefício. Investimos continuamente no atendimento ao cliente, porque, assim como você, nós também não gostamos de esperar dias para obter uma resposta.</p>

          <p>2. COMO FUNCIONA O 99SAVES.COM?</p>

          <p>Nós, do 99SAVES.COM, não vendemos produtos e nem prestamos os serviços divulgados em nosso site. Tudo, tudo mesmo, o que você vê ofertado em nosso site é vendido através de empresas terceiras.
          Nosso trabalho é negociar com esses fornecedores ofertas extremamente vantajosas para você, que vão ao ar somente depois de um criterioso processo de seleção. Isso quer dizer que o nosso papel é proporcionar o seu acesso a ofertas de produtos ou serviços, que serão prestados ou fornecidos por uma empresa terceira. A nossa remuneração vem através de uma pequena comissão sobre as vendas das ofertas divulgadas em nosso site.
          Os termos e condições das ofertas, bem como a prestação dos serviços ou venda dos produtos, são todos estabelecidos ou realizados diretamente pelas empresas terceiras. E, por isso, é tão importante que você também confie nessa empresa, e reporte a nós qualquer problema que eventualmente tiver com ela para que possamos tomar as devidas providências, afinal, você, consumidor, é a razão de ser do nosso negócio, e nós não queremos fornecedores que não te ofereçam uma experiência incrível!
          COMO FUNCIONA?
          1.	O 99SAVES.COM cria novos SAVES a partir da identificação dos interesses dos consumidores e os publica para que você possa participar.
          2.	Você, consumidor, acessa nosso SAVE para o produto desejado e registra seu interesse de compra através do botão PARTICIPAR DESTE SAVE.
          3.	O pedido de oferta é enviado para todos os fornecedores homologados para aquele tipo de produto para que eles disponibilizem a melhor oferta do mercado.
          4.	As ofertas selecionadas são disponibilizadas para que você possa escolher a que mais lhe agradar.
          5.	A oferta vencedora será disponibilizada para compra diretamente com o fornecedor.
          6.	Após a compra ser processada com sucesso o fornecedor entrega o produto diretamente no endereço escolhido.</p>

          <p>3. QUAL A VANTAGEM DESSAS EMPRESAS EM REALIZAR OFERTAS COM DESCONTOS TÃO GRANDES?</p>

          <p>Os fornecedores homologados a participarem da nossa plataforma farão os mesmos preços ofertados a grandes varejistas acrescendo somente os custos que possibilitarão com que os produtos sejam entregues em sua casa. Estes fornecedores sabem também que para que uma oferta seja selecionada não poderá existir preço menor ou similar no mercado, caso contrário a oferta não chegará aos participantes do SAVE.</p>

          <p>4. OS PRODUTOS OU SERVIÇOS POSSUEM A MESMA QUALIDADE DAQUELES COMERCIALIZADOS NO MERCADO, FORA DO SISTEMA DE E-COMMERCE?</p>

          <p>Sim. Ao fechar um acordo conosco, as empresas fornecedoras se comprometem, por contrato, a oferecerem produtos e serviços na mesma qualidade daqueles já praticados por elas no mercado. Se comprometem, também, a somente oferecer e entregar produtos e serviços originais, lícitos e permitidos pelas autoridades competentes e devidamente de acordo com as leis vigentes no Brasil.
          Para que isso ocorra, nós trabalhamos continuamente nas estratégias de controle dessas ofertas. E você pode nos ajudar, reportando qualquer irregularidade para qualquer um de nossos canais de atendimento, seja pelo telefone (11) 3042-1099 ou pelo e-mail atendimento@99saves.com.</p>

          <p>5. O PREÇO E CONDIÇÕES DA OFERTA ANUNCIADA DEVEM SER GARANTIDOS AO CONSUMIDOR?</p>

          <p>Sim. Todos os produtos e serviços ofertados em nosso site devem ser fornecidos exatamente iguais aos que foram disponibilizados, após a votação, para compra. Por esse motivo, é sempre importante ler as condições da oferta atentamente, antes de realizar a compra. Qualquer irregularidade, por favor, entre em contato imediatamente com o nosso SAC, pelo telefone (11) 3042-1099 ou pelo e-mail atendimento@99saves.com.</p>

          <p>6. COMPRAR PELO 99SAVES.COM É SEGURO?</p>

          <p>Existem diversas dicas para que você evite problemas e caia em armadilhas conforme a seguir:
          a) Você deve sempre verificar o site que está navegando. Nossas ofertas são veiculadas exclusivamente no endereço http://www.99saves.com. Se você tiver acessado um site com endereço diferente desse ou, tiver recebido informações por newsletters ou outros canais de mídia para acessar o site através de outro endereço, desconfie!
          b) Para compra do produto não tente acessar o site do fornecedor através de outros links que não tenham sido disponibilizados pelo 99saves.com através do botão COMPRAR.</p>

          <p>7. COMO FAÇO PARA COMPRAR UMA OFERTA DO 99SAVES.COM?</p>

          <p>Para ter acesso às nossas ofertas, entre no site www.99saves.com através do computador, tablet ou smartphone.
          Na página do SAVE você tem acesso as características levadas em consideração para disponibilização da oferta, clique em PARTICIPAR DESTE SAVE somente se tiver o real interesse de compra do produto com as características mencionadas.
          Ao participar de um save você deverá aguardar o período de encerramento, sendo este no máximo 5 dias. Finalizado este período os fornecedores enviarão suas ofertas para que o 99saves.com selecione e as disponibilizem para os participantes.
          Os participantes do SAVE terão até 24 horas para votar na oferta que mais lhe agrada, na tela de votação, o participante deve analisar atentamente as características do produto ofertado para confirmar seu interesse de compra, após encerramento do período de votação a oferta vencedora será disponibilizada para compra.
          Ao clicar no link “Comprar Agora”, você visualizará uma tela com um código exclusivo de desconto que deverá ser digitado no carrinho de compras, este código é limitado a uma única compra, não esqueça de salva-lo, passando pela tela do código você será direcionado para realizar a compra diretamente no site do fabricante.
          Todas as ofertas publicadas em nossa Plataforma ficam disponíveis para compra por somente 48 horas. Ao ser atingido o período a oferta encerrará suas vendas, impossibilitando assim a compra por você ou qualquer outro consumidor da nossa Plataforma.
          O código exclusivo disponibilizado para compra será enviado por email para que você não o perca, lembrando que para ativar o valor ofertado, o código deverá ser digitado no carrinho de compras do site do fabricante na fase de finalização do pedido.
          Você poderá acessar o seu código pelos caminhos descritos abaixo:
          Através do e-mail: 1) Abra o e-mail direcionado para sua caixa de entrada intitulado “Seu código exclusivo 99SAVES.COM”.
          Através do site: 1) Acesse o nosso site www.99saves.com, 2) Faça login com seu e-mail e senha; 3) Acesse o link MEUS SAVES, no menu superior da página; e 4) Clicar novamente em COMPRAR AGORA.
          II. DIREITOS DOS CONSUMIDORES</p>

          <p>8. QUAIS SÃO OS DIREITOS ASSEGURADOS AOS CONSUMIDORES DO 99SAVES.COM?</p>

          <p>Nós, do 99SAVES.COM, reconhecemos a aplicação integral do Código de Defesa do Consumidor (Lei No. 8.078, de 11 de setembro de 1990), bem como o Decreto no 7.962/13, que dispõe sobre a contratação no comércio eletrônico, em favor de seus clientes, e tem como foco principal o cumprimento dessas regras. Portanto, se você verificar qualquer irregularidade praticada pelo prestador do produto ou serviço, em desconformidade com a oferta anunciada, sugerimos entrar em contato com o nosso SAC nos telefones (11) 3042-1099 ou pelo e-mail atendimento@99saves.com. Nós estamos comprometidos a atuar perante os fornecedores para que cumpram integralmente a oferta, em seu favor, o consumidor.</p>

          <p>9. QUAIS SÃO OS DIREITOS ASSEGURADOS NO CÓDIGO DE DEFESA DO CONSUMIDOR?</p>

          <p>O Código de Defesa do Consumidor (CDC) possui diversas regras que estabelecem os direitos e garantias do consumidor, tais como o direito à transparência e informação adequadas, a proteção contra oferta ou publicidade enganosa, proteção contra cláusulas abusivas, dentre outras. Caso tenha interesse em saber mais sobre seus direitos e como executá-los, recomendamos a leitura dessa lei, acessando este link:http://www.planalto.gov.br/ccivil_03/leis/L8078.htm ou através do site oficial do governo brasileiro, ao site www.planalto.gov.br</p>

          <p>10. COMPREI UMA OFERTA E ME ARREPENDI, COMO DEVO PROCEDER?</p>

          <p>Conforme prevê o Código de Defesa do Consumidor, nas hipóteses de compra à distância (tais como aquelas realizadas pela internet) as empresas precisam garantir ao consumidor o direito de arrependimento (desistência da compra), no caso de desistência da compra, pelo prazo de 07 (sete) dias contados da data da compra da oferta ou do recebimento do produto, conforme for o caso.
          Essa regra é integralmente cumprida por nós do 99SAVES.COM e por nossos fornecedores homologados. Se, porventura, você desejar cancelar uma compra onde o pagamento já tenha sido confirmado, ela poderá ser realizada dentro de 07 (sete) dias contados da data da compra, devendo você, por favor, entrar em contato diretamente com o atendimento do fornecedor para que o cancelamento da compra seja realizado, caso exista alguma dificuldade neste processo, sugerimos entrar em contato com o nosso SAC nos telefones (11) 3042-1099 ou pelo e-mail atendimento@99saves.com.
          O prazo estimado para que você receba o reembolso da compra varia de acordo com a forma de pagamento utilizada.
          </p>

          <p>11. EM QUAIS HIPÓSTESES NÃO É POSSÍVEL FAZER O CANCELAMENTO DA MINHA COMPRA?</p>

          <p>Assim como Código de Defesa do Consumidor estabelece obrigações a nós, do 99SAVES.COM, perante você, consumidor, essa lei também reserva alguns direitos para a empresa, tais como o não cancelamento da compra em hipóteses específicas.
          Dentre outras hipóteses, nossos fornecedores não são obrigados a proceder com o cancelamento de sua compra:
          a) Quando você deixar de observar as regras específicas da oferta ou da Política de Consumo encontrada no site do fornecedor;
          b) Quando você já tiver utilizado os serviços total ou parcialmente;
          c) Quando ainda não transcorrido o prazo para entrega do produto;
          d) Quando você deixar de fornecer alguma informação essencial ou fornecer informação errada, necessária para que a sua compra seja devidamente satisfeita (tais como as informações de endereço completo para entrega de produto);
          e) Quando o fornecedor não tiver a disponibilidade da data desejada por você, mas tiver disponibilidade de outra data e horário para utilização dos serviços ou entrega dos produtos, desde que nas regras da oferta não conste a nossa obrigação e do fornecedor de fornecerem o serviço em uma determinada data específica;</p>

          <p>12. O PRODUTO OU SERVIÇO QUE COMPREI ESTÁ COM DEFEITO (VÍCIO DE QUALIDADE OU QUANTIDADE). COMO DEVO PROCEDER?</p>

          <p>Uma vez verificado o vício no produto ou serviço, você poderá comunicar diretamente a empresa que realizou a venda, nas informações sobre o fornecedor diretamente disponíveis no site onde a compra foi efetivada. Você também poderá nos acessar através do nosso SAC nos telefones (11) 3042-1099 ou pelo e-mail atendimento@99saves.com para que nós possamos auxiliar a solução para você junto à empresa fornecedora, o mais breve possível.
          Nós lembramos que, de acordo com o que dispõe o Código de Defesa do Consumidor, se a questão não for resolvida em até 30 (trinta) dias da data da comunicação, você tem direito a optar por uma das seguintes alternativas:
          a) a substituição do produto por outro da mesma espécie, em perfeitas condições de uso;
          b) a restituição imediata da quantia paga, monetariamente atualizada, sem prejuízo de eventuais perdas e danos; ou
          c) o abatimento proporcional do preço.</p>

          <p>13. QUAL O PRAZO PARA RECLAMAR DO VÍCIO (QUALIDADE/ QUANTIDADE) DO PRODUTO?</p>

          <p>Conforme determina o Código de Defesa do Consumidor, você tem garantido um prazo mínimo para reclamar dos defeitos juntamente ao estabelecimento comercial, contados da data da entrega do produto ou da prestação do serviço, a saber:
          a) 30 (trinta) dias, tratando-se de fornecimento de serviço e de produtos não duráveis; e
          b) 90 (noventa) dias, tratando-se de fornecimento de serviço e de produtos duráveis.
          V. DOS DIREITOS DO 99SAVES.COM</p>
          
          <p>14. VI QUE TENHO DIVERSOS DIREITOS ASSEGURADOS, PORÉM, QUAIS SÃO MINHAS OBRIGAÇÕES PERANTE O 99SAVES.COM?</p>

          <p>Como não poderia deixar de ser, o seu relacionamento conosco lhe ressalva alguns direitos, mas também lhe impõe algumas obrigações, a saber:
          a) DAS MODIFICAÇÕES AO PRESENTE TERMO: Os termos desta Política de Consumo 99SAVES.COM poderão sofrer adequações e alterações a qualquer tempo, as quais serão prontamente disponibilizadas por nós no site www.99saves.com desde que essas alterações não violem as regras de proteção ao consumidor.
          b) OBEDIÊNCIA AOS PRAZOS DAS OFERTAS: Já se viu que o produto poderá ser ofertado através do site por um período determinado (Período de Oferta). Assim, você, consumidor, somente terá direito à aquisição do produto durante esse período, mediante o efetivo pagamento, conforme instruções indicadas em nosso site. Finalizado o prazo da oferta, não será mais possível realizar a compra.</p>

          <p>15. E NOS CASOS EM QUE CONSUMIDORES TENTAM BURLAR O 99SAVES.COM?</p>

          <p>Adotaremos, incansavelmente, todas as medidas civis e criminais cabíveis na hipótese de detectar qualquer tentativa de terceiros de violar nossos sistemas e/ou banco de dados.
          Além disso, reforçamos a necessidade de obediência recíproca a esta Política de Consumo, de modo que, caso você desrespeite a legislação aplicável e/ou os compromissos por aqui assumidos, estará sujeito à suspensão e/ou cancelamento do cadastro, a qualquer tempo, definitiva ou temporariamente, sem prejuízo das demais penalidades aplicáveis, civil e criminalmente.</p>

          <p>16. O 99SAVES.COM PODERÁ CANCELAR AUTOMATICAMENTE O MEU CADASTRO?</p>

          <p>Sim. Poderemos, visando à segurança de nossos serviços, e a nosso exclusivo critério, cancelar os cadastros de nossos consumidores, sobretudo quando verificar a ocorrência de qualquer uma das seguintes hipóteses:
          a) Verificação de cadastro duplicado;
          b) Verificação de novo cadastro realizado por usuário que teve seu cadastro cancelado e/ou suspenso;
          c) For constatada fraude ou tentativa de fraude; e
          d) Fornecimento de informações solicitadas incorretas e/ou inverídicas ou, ainda, se o usuário se negar a prestar eventuais informações essenciais por nós solicitadas para a segurança do cadastro.
          Ressaltamos que o cancelamento de cadastro feito como penalidade pela ocorrência de qualquer uma das hipóteses acima não exclui a possibilidade de fazer os praticantes de atos ilícitos responderem civil e criminalmente pelas consequências de seus atos e/ou omissões.</p>

          <p>17. COMO SE DÁ O RESPEITO À PROPRIEDADE INTELECTUAL DO 99SAVES.COM?</p>

          <p>Os elementos e/ou ferramentas encontrados na Plataforma são de nossa titularidade exclusiva ou por nós licenciados, sujeitos à proteção dos direitos de propriedade intelectual de acordo com as leis brasileiras e tratados e convenções internacionais dos quais o Brasil seja signatário. Apenas a título exemplificativo, entendem-se como tais: textos, softwares, scripts, imagens gráficas, fotos, sons, músicas, vídeos, recursos interativos e similares, marcas, logotipos e o trade dress.
          Qualquer Conteúdo do Usuário de qualquer espécie feito por você ou qualquer terceiro é feito exclusivamente por você e tal terceiro e não por nós. Outros usuários podem postar um Conteúdo do Usuário que seja impreciso ou enganoso. Não endossamos e não somos responsáveis por qualquer Conteúdo do Usuário, e não será responsável por qualquer perda ou dano causado pela publicação e compartilhamento de tal Conteúdo do Usuário. O Conteúdo do Usuário reflete as suas opiniões e podem não refletir a nossa opinião.</p>

          <p>18. QUEM PODE REALIZAR O CADASTRO NO 99SAVES.COM?</p>

          <p>Você, se pessoa física, deve ser maior de 18 anos, menor emancipado, ou possuir o consentimento legal, expresso e por escrito, dos pais ou responsável legal e ser plenamente capaz para se vincular a este termo de Política de Consumo 99SAVES.COM, possibilitando o acatamento e cumprimento das suas disposições.
          As pessoas jurídicas podem se cadastrar, normalmente, o que deve ser feito na figura do seu representante legal.
          Advertimos que menores de idade não devem enviar informações pessoais, tais como endereço de e-mail, nome e/ou informação para que possamos realizar contato.</p>

          <p>19. HÁ ALGUMA OUTRA INFORMAÇÃO RELEVANTE QUE EU PRECISE SABER?</p>

          <p>As políticas por nós divulgadas estabelecem o pleno e completo acordo e entendimento com os consumidores, sendo que a efetivação do cadastro supera e revoga todos e quaisquer entendimentos, propostas, acordos, negociações e discussões havidos anteriormente entre as partes.</p>

          <p>VI. LI E ENTENDI. MAS QUERO RECLAMAR</p>

          <p>20. APESAR DAS DISPOSIÇÕES AQUI DESTACADAS, ME SINTO LESADO. COM QUEM POSSO RECLAMAR?</p>
          
          <p>Possuímos SAC através dos telefones (11) 3042-1099 ou pelo e-mail atendimento@99saves.com. Nossa equipe está orientada e treinada para te auxiliar, e procederá com a resposta de seu pedido em, no máximo, 05 (cinco) dias.
          Portanto, toda reclamação, sugestão ou elogio é bem-vindo e servirá como forma de incrementar e/ou aperfeiçoar, ainda mais, as nossas atividades.</p>


        </PageContainer>
        <Footer marginTop />
      </Page>
    );
  }
}

export default withApi()(Index);

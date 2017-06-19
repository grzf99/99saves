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
          <Title>FAQ</Title>

          <p>1. O QUE É O 99SAVES.COM?</p>

          <p>R. Se você for em uma loja negociar a compra de um produto, você conseguirá uma condição específica. Se você for e negociar a compra de 2 produtos similares, você conseguirá uma negociação melhor. Nós comprovamos isso (Assista: ). Agora imagine isso em um volume gigantesco. O 99saves.com é a 1ª plataforma de negociação direta entre consumidores e fabricantes. Não somos uma loja virtual, não somos um varejista, muito menos um site de compra coletiva. Representamos a união de consumidores em busca de produtos e serviços similares, barganhando melhores condições de compra diretamente com o fabricante/fornecedor através da compra em volume. </p>

          <p>2. COMO FUNCIONA O 99SAVES.COM?.</p>

          <p>R. Unimos consumidores no que chamamos de Saves específicos de produtos. Existem Saves de televisores, de geladeiras, micro-ondas e cada vez mais serão adicionados saves dos mais variados tipos em nossa plataforma. Cada Save representa um produto, de forma ampla (como por exemplo “Televisor 60 polegadas”). Ao lançar um “Save”, começamos a receber consumidores que possuem interesse em comprar aquele tipo de produto (cada save fica ativo por no máximo 5 dias). Ao mesmo tempo, possuímos uma base com os principais fabricantes e marcas daquele produto cadastrados em nossa plataforma. Ao encerrar o período de entrada de consumidores, encerramos o save e liberamos a ordem para a base de fabricantes. Por exemplo: Vamos supor que 300 pessoas se cadastraram no Save de televisor 60 polegadas. Os fabricantes recebem a informação de que desejamos comprar 300 televisores de 60 polegadas e são convidados a fazerem a sua melhor oferta (Entenda-se por melhor oferta, o melhor produto que eles possuem e o menor preço que podem vender). Lembre-se que os fabricantes sabem que seus concorrentes estão participando da concorrência, mas não sabem a oferta que farão, sendo assim, eles fazem o melhor possível para ganhar o nosso pedido.</p>

          <p>3. QUAL A VANTAGEM DESSES FABRICANTES EM REALIZAR OFERTAS COM PREÇOS TÃO MELHORES?</p>

          <p>R. Na verdade, o fabricante vende pelo mesmo preço que vende ao varejo, só que desta vez nós pagamos o preço direto do fabricante, sem precisar do varejo.
          Para o fabricante, hoje, o único canal de venda que possui é o Varejo. Muitos até possuem loja virtual e poderiam fazer um preço melhor diretamente para o consumidor final (sendo que eles não possuem lojas físicas e os altos custos disso), porém, o Varejo (seu cliente) o inibe de fazer isso por concorrer diretamente com ele. O 99saves.com é a chance que o fabricante precisava para vender mais, diretamente para o consumidor final, através da compra em volume. O varejo compra 100, 200, 1.000 unidades de uma vez, por isso compra por um preço baixo, adiciona seus altos custos e repassa o preço com seus custos e lucros diretamente para nós. A partir de agora, o consumidor também compra em volume, porém, o preço real do fabricante é 100% repassado para o consumidor, sem intermediários. Agora, o fabricante consegue fazer com que seu produto chegue ao consumidor final por um preço muito mais baixo, fazendo com que o consumidor compre mais e consequentemente, ele venda mais, girando a economia e aumentando seus resultados.</p>

          <p>4. EU PRECISO PAGAR ALGO PARA COMPRAR?</p>

          <p>R. Não. O 99saves.com é uma plataforma criada por usuários para usuários. Você não precisa pagar nada para comprar produtos diretamente com o fabricante. Você só pagará uma taxa se demonstrar o interesse pelo produto e não o comprar.</p>

          <p>5. POR QUE ENTÃO EXISTE UMA TAXA DE R$ 5,00 PARA ENTRADA EM CADA SAVE?</p>

          <p>R. Imagine o lado do fabricante. Os consumidores, mesmo que não tem interesse em um produto, aplicam para o Save apenas por curiosidade. O fabricante faz um preço pensando em vender 500 unidades e quando vê, apenas 50 pessoas compraram. A taxa de R$ 5,00 serve para garantir que o consumidor tem o real interesse naquela compra. Se o consumidor comprar o produto, a taxa é estornada do cartão e ele não pagará. Caso ele opte por não comprar, esta taxa é repassada ao fabricante. </p>

          <p>6. EU POSSO ENTRAR EM 3 SAVES, NÃO COMPRAR E NÃO PAGAR NADA POR ISSO, É ISSO MESMO?</p>

          <p>R. Exatamente! Nós queremos que você se sinta seguro em conhecer nossa plataforma e ver com seus próprios olhos o quanto somos fortes juntos. Ao se cadastrar no 99saves.com, você poderá participar de até 3 saves e não comprar o produto, sem pagar nada por isso. Você verá o quanto temos força negociando juntos, diretamente com o fabricante e se sentirá seguro para comprar seus produtos e serviços através da nossa plataforma. Estamos seguros disso!</p>

          <p>7. POR QUE EXISTE UM BUSCADOR DO BUSCAPÉ DENTRO DO SITE? </p>

          <p>R. Nós incentivamos que você pesquise! Da mesma forma que o fabricante sabe que para ganhar um Save e a possibilidade de vender de uma só vez para todos nós, nós queremos que você pesquise o produto vencedor e comprove você mesmo que não existe no mercado aquele produto por um preço menor do que aqui! Faça esta analise você também.</p>

          <p>8. EU SOU OBRIGADO A COMPRAR UM PRODUTO DE UM SAVE QUE ESTOU PARTICIPANDO?</p>

          <p>R. Não! Ninguém é obrigado a comprar um produto que ainda não sabe qual será. Se você gostar da oferta (que garantimos que será o melhor custo benefício do mercado), excelente. Se você não gostar, não precisa comprar.</p>

          <p>9. COMO O 99SAVES.COM SELECIONA AS MELHORES OFERTAS?</p>

          <p>R. Temos uma equipe dedicada 100% a analisar as ofertas recebidas pelos fabricantes, realizando uma análise de qualidade do produto ofertado e fazendo uma pesquisa de mercado, comparando com os preços praticados em lojas físicas e na internet. Os fabricantes sabem que, se estamos comprando em volume e não possuímos os custos do varejo, deveremos receber o menor preço do mercado. É isso que avaliamos! O melhor produto versus o menor preço. A junção disso é o produto que disponibilizaremos para os consumidores votar e posteriormente, comprar.</p>

          <p>10. EU POSSO VOTAR NA MELHOR OFERTA?</p>

          <p>R. Sim, após entrar em um Save, você estará habilitado para participar de todo o processo, até a compra do produto. Assim que o Save encerrar (parar de receber interessados), o sistema dispara a ordem de oferta aos fabricantes e começa a recebê-las. Após esta etapa, a equipe do 99saves.com realizará a análise das melhores ofertas e as disponibilizará para votação entre os participantes daquele Save (não obrigatória a participação). Encerrada a votação, o produto é automaticamente disponibilizado para compra.</p>

          <p>11. QUANTO TEMPO DURA TODO O PROCESSO, DA MINHA ENTRADA EM UM SAVE ATÉ A COMPRA?</p>

          <p>R. No máximo, 8 dias. Cada Save(dependendo do produto) fica no máximo durante 5 dias aberto para entrada de consumidores. Após este período, o sistema libera a ordem de compra aos fabricantes que tem 48 horas para enviar sua melhor oferta. Encerrado este tempo, a equipe do 99saves.com disponibiliza em até 24 horas os melhores produtos para votação dos consumidores, que tem 24 horas para votar e automaticamente o produto vencedor é liberado para compra através de um link exclusivo no site do fabricante.</p>

          <p>12. QUANTO TEMPO TENHO PARA COMPRAR O PRODUTO VENCEDOR?</p>

          <p>R. Após produto vencedor ser anunciado, o consumidor é comunicado e tem 48 horas para finalizar sua compra ou o link é invalidado. </p>

          <p>13. OS PRODUTOS OU SERVIÇOS POSSUEM A MESMA QUALIDADE DAQUELES COMERCIALIZADOS NO MERCADO, FORA DO 99SAVES.COM?</p>

          <p>R. Definitivamente sim. Ao fechar um acordo conosco, os fabricantes se comprometem, por contrato, a oferecerem produtos e serviços na mesma qualidade daqueles já praticados por eles no mercado. Se comprometem, também, a somente oferecer e entregar produtos e serviços originais, lícitos e permitidos pelas autoridades competentes e devidamente de acordo com as leis vigentes no Brasil.</p>

          <p>14. POR QUE O SISTEME PEDE PARA EU AVALIAR O FABRICANTE E O PRODUTO APÓS REALIZAR UMA COMPRA?</p>

          <p>R. O 99saves.com foi feito para você! Exigimos que o fabricante ofereça a melhor experiência possível aos nossos consumidores, desde a entrega até a real qualidade dos seus produtos. Por este motivo, solicitamos que você dê uma nota ao processo na entrega do produto. Os fabricantes que não forem bem avaliados, serão excluídos da nossa base e não poderão mais comercializar produtos para nós. </p>

          <p>15. COMPRAR NO FABRICANTE PELO 99SAVES.COM É SEGURO?</p>

          <p>R. Nós garantimos a segurança! Para participarem do 99saves.com os fabricantes devem possuir sites 100% seguros para compra. Nós realizamos esta análise antes de aprovarmos o cadastro deles. Fique tranquilo, aqui a segurança é checada e redobrada.</p>

          <p>16. COMO FAÇO PARA COMPRAR UMA OFERTA DO 99SAVES.COM?</p>

          <p>R. Se você participou de um Save, ao finalizar, o produto vencedor será disponibilizado para compra através de um link no seu painel de usuário. Acesse o seu painel, clique no link e compre diretamente no site do fabricante/parceiro.</p>

        </PageContainer>
        <Footer marginTop />
      </Page>
    );
  }
}

export default withApi()(Index);

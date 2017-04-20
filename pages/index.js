import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import Modal from 'react-modal';
import SwipeableViews from 'react-swipeable-views';
import 'isomorphic-fetch';

import config from '../config';
import { colors } from '../components/styles/variables';
import { Heading, Text } from '../components/common/typography';
import Button from '../components/common/button';
import Toolbar from '../components/toolbar';
import Card from '../components/card';
import Footer from '../components/footer';
import Tabs from '../components/common/tabs';
import Tab from '../components/common/tab';
import Toast from '../components/common/toast';
import Container from '../components/common/container';

const Page = styled.div`
  background: ${colors.black};
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  width: 100%;

  ${props => props.hasFooter && 'padding-bottom: 98px'};
`;

const Headline = styled.div`
  background-color: ${colors.alternateWhite};
  color: ${colors.black};
  display: none;
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  line-height: 32px;
  margin: 20px 0;
  text-align: center;

  @media (min-width: 640px) {
    display: block;
  }
`;

const CardsList = styled(Container)`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: row wrap;
`;

const StyledCard = styled(Card)`
  @media (min-width: 480px) {
    flex: 1;
    flex-basis: calc(50% - 10px);
    max-width: calc(50% - 10px);
    margin: 36px 5px 0;

    &:nth-child(3n + 1) {
      margin-left: 0;
    }

    &:nth-child(3n + 2) {
      margin-right: 0;
    }
  }

  @media (min-width: 960px) {
    flex-basis: calc(33.3% - 10px);
    max-width: calc(33.3% - 10px);

    &:nth-child(3n + 2) {
      margin-right: 5px;
    }

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
`;

const BlankState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  padding: 60px 30px;
  text-align: center;
  max-width: 480px;

  @media (min-width: 640px) {
    padding: 150px 30px;
  }

  > h1 {
    margin: 0 20px;
  }
`;

const ModalContent = styled.div`
  > * + * {
    margin-top: 25px !important;
  }
`;

const ModalHeading = styled(Heading)`
  margin: 16px 5px 0;
`;

const ModalText = styled(Text)`
  font-size: 14px;
`;

const FacebookButton = styled(Button)`
  background-color: ${colors.facebookBlue};
  background-image: url(/static/images/bt-facebook.svg);
  background-position: 18px 12px;
  background-repeat: no-repeat;
  font-size: 17px;
  font-weight: 400;
  padding-left: 40px;
  text-transform: inherit;

  &:hover {
    background-color: ${lighten(0.1, colors.facebookBlue)};
  }
`;

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  content: {
    top: '50%',
    left: '20px',
    right: '20px',
    bottom: 'auto',
    border: '0',
    transform: 'translateY(-50%)',
    borderRadius: '0',
    maxWidth: '480px',
    margin: '0 auto'
  }
};

const Banner = styled.div`
  background: ${colors.black} url(/static/images/img-header@2x.png) no-repeat center center;
  background-size: cover;
  margin-top: 0;
  min-height: 626px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -14px;
    right: 0;
    width: 100%;
    height: 30px;
    background: ${colors.white};
    border-left: 0;
    border-right: 50px solid transparent;
    border-top: 25px solid ${colors.white};
    transform: rotate(179deg);
  }
`;

const BannerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 450px;
  justify-content: space-around;
  margin-top: 30px;
`;

const Title = styled.h1`
  color: ${colors.white};
  text-align: center;
  font-family: Oswald;
  font-size: 72px;
  font-weight: 500;
  text-transform: uppercase;

  @media (max-width: 500px) {
    font-size: 47px;
  }
`;

const Subtitle = styled.div`
  color: ${colors.white};
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.67;
  max-width: 670px;
  text-align: center;
  width: 100%;

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const BannerActions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 500px;

  @media (max-width: 500px) {
    flex-direction: column;
    height: 130px;
    width: 100%;
  }
`;

const VideoButton = styled(Button)`
  background-image: url(/static/images/ic-play.svg);
  background-position: 20px center;
  background-repeat: no-repeat;
  font-size: 14px;
  padding-left: 50px;
`;

const BrandContainer = styled.div`
  align-items: center;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  min-height: 280px;
  justify-content: flex-start;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -20px;
    right: 0;
    width: 100%;
    height: 80px;
    background: ${colors.white};
    border-left: 0;
    border-right: 50px solid transparent;
    border-top: 5px solid #ffffff;
    transform: rotate(1.7deg);
  }

  @media (max-width: 728px) {
    min-height: 550px;
  }
`;

const BannerTitle = styled.h2`
  color: ${colors.battleshipFrey};
  font-family: Oswald;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;

const BrandImagesContainer = styled(Container)`
  align-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 728px) {
    flex-direction: column;
    min-height: 250px;
  }
`;

const BrandImage = styled.img`
  align-self: center;
`;

const WeAreNotContainer = styled(Container)`
  align-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;

  @media (max-width: 728px) {
  }
`;

const WeAreNot = styled.div`
  text-align: center;
  position: relative;
`;

const WeAreNotSubtitle = styled.span`
  background: ${colors.green};
  bottom: -25px;
  color: ${colors.white};
  font-family: 'Oswald', sans-serif;
  font-size: 36px;
  font-weight: bold;
  padding: 5px 22px;
  text-align: center;
  text-transform: uppercase;
  position: relative;
`;

const WeAreNotTitle = styled.h5`
  color: ${colors.darkGreyBlue};
  font-family: 'Oswald', sans-serif;
  font-size: 72px;
  font-weight: bold;
  letter-spacing: 5px;
  margin: 0;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
`;

const WeAreNotDescription = styled.p`
  color: ${colors.white};
  font-family: 'Oswald', sans-serif;
  font-size: 28px;
  font-weight: 300;
  margin: 1em auto;
  max-width: 770px;
  text-align: center;
  text-transform: uppercase;

  > span {
    background: ${colors.green};
    padding: 0 4px;
  }
`;

const ItWorkSection = styled(Container)`
  margin-top: 50px;

  @media (max-width: 728px) {
  }
`;

const ItWorkContainer = styled.div`
  align-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 80px 0;
  width: 100%;

  &.reverse {
    flex-direction: row-reverse;
  }

  &.center {
    justify-content: center;
    align-items: center;
  }
`;

const ItWorkImage = styled.img`
  align-self: flex-start;
`;

const ItWorkInfos = styled.div`
  max-width: 380px;
`;

const ItWorktTitle = styled.h4`
  color: ${colors.white};
  font-family: 'Oswald', sans-serif;
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  text-align: left;
  text-transform: uppercase;
`;

const ItWorkDescription = styled.p`
  color: ${colors.battleshipFrey};
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  line-height: 1.56;
  text-align: left;
`;

const SaveSection = styled.section`
  background: ${colors.darkSkyBlue2};
  margin-top: 130px;
  min-height: 200px;
  position: relative;
  width: 100%;
  z-index: 0;

  &:before {
    content: "";
    position: absolute;
    top: -46px;
    right: 0;
    width: 100%;
    height: 83px;
    background: ${colors.darkSkyBlue2};
    border-left: 0;
    border-right: 1366px solid transparent;
    border-top: 30px solid ${colors.darkSkyBlue2};
    transform: rotate(-2.7deg);
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -30px;
    right: 0;
    width: 100%;
    height: 50px;
    background: ${colors.darkSkyBlue2};
    border-left: 0;
    border-right: 50px solid transparent;
    border-top: 79px solid ${colors.darkSkyBlue2};
    transform: rotate(-2.2deg);
  }
`;

const SaveContainer = styled(Container)`
  text-align: center;
  position: relative;
  width: 100%;
  z-index: 9;
`;

const SaveTitle = styled.h3`
  color: ${colors.white};
  font-family: 'Oswald', sans-serif;
  font-size: 72px;
  font-weight: bold;
  letter-spacing: 11.2px;
  margin: 0 0 -6px;
  text-align: center;
  text-transform: uppercase;
`;

const SaveSubtitle = styled.p`
  background: ${colors.darkBlue};
  color: ${colors.white};
  display: inline-block;
  font-family: 'Oswald', sans-serif;
  font-size: 28px;
  font-weight: 300;
  line-height: 1.21;
  margin-top: -14px;
  padding: 10px 20px;
  text-align: center;
  text-transform: uppercase;
`;

const SaveInfo = styled.span`
  color: ${colors.white};
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-sttyle: italic;
  margin-top: 0px;
  text-align: center;
`;

export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch(`${config.API_URL}/saves?limit=3`);
    const saves = await res.json();
    return { saves };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      logged: false,
      modalIsOpen: false,
      activeTab: 1,
      saves: props.saves,
      subscriptions: {
        count: 0,
        rows: []
      },
      accessToken: '',
      subscribeTo: 0,
      showToast: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.reloadSaves = this.reloadSaves.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  componentDidMount() {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) this.authenticate(accessToken).then(this.reloadSaves);
  }

  loginWithFacebook() {
    return new Promise((resolve) => {
      FB.login((res) => {
        window.localStorage.setItem('accessToken', res.authResponse.accessToken);
        resolve(res);
      }, { scope: 'email' });
    });
  }

  authenticate(accessToken) {
    return fetch(`${config.API_URL}/auth/facebook?access_token=${accessToken}`)
      .then(user => user.json())
      .then(({ user }) => {
        this.setState({
          user,
          logged: true,
          modalIsOpen: false,
          subscribeTo: 0,
          accessToken
        });
      });
  }

  handleLogin(subscribeTo) {
    this.loginWithFacebook()
      .then(res => this.authenticate(res.authResponse.accessToken).then(subscribeTo
        ? this.handleSubscribe(subscribeTo, res.authResponse.accessToken)
        : Promise.resolve()
      ))
      .then(this.reloadSaves);
  }

  handleSubscribe(subscribeTo, accessToken) {
    return fetch(
      `${config.API_URL}/saves/${subscribeTo}/subscriptions?access_token=${accessToken || this.state.accessToken}`,
      { method: 'POST' }
    ).then(() => {
      const rows = [...this.state.saves.rows].map((row) => {
        const save = row;
        if (save.id === subscribeTo) save.hasSubscribed = true;
        return save;
      });
      this.setState({ saves: { count: rows.length, rows }, showToast: true });
      setTimeout(() => this.setState({ showToast: false }), 4000);
    });
  }

  openModal(subscribeTo) {
    this.setState({ modalIsOpen: true, subscribeTo });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChangeIndex(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  reloadSaves() {
    fetch(`${config.API_URL}/saves?access_token=${this.state.accessToken}`)
        .then(saves => saves.json())
        .then((saves) => {
          this.setState({
            saves
          });
        });
  }

  renderUserSaves() {
    const subscribedSaves = this.state.saves.rows.filter(save => save.hasSubscribed);
    return (
      subscribedSaves.length
        ? subscribedSaves.map(
            save =>
              <StyledCard
                {...save}
                key={save.id}
                logged={this.state.logged}
                openLoginModal={() => this.openModal(save.id)}
                handleSubscribe={() => this.handleSubscribe(save.id)}
              />
          )
        : (
          <BlankState>
            <Heading white>Ainda não tem nenhum save???</Heading>
            <Text white>O que você está esperando? Escolha os produtos que te interessam e participe do grupo que conseguirá os melhores descontos do mercado!</Text>
            <div>
              <Button outline onClick={() => this.handleChangeIndex(0)}>Ver todos os saves</Button>
            </div>
          </BlankState>
        )
    );
  }

  render() {
    return (
      <Page hasFooter>

        <Banner>
          <Toolbar login={() => this.handleLogin()} logged={this.state.logged} background="transparent" />

          <BannerContainer>
            <Title>Juntos pelo melhor preço</Title>
            <Subtitle>
              Conectamos consumidores, ganhamos força e brigamos pelos melhores produtos e preços diretamente com a fábrica. Sem intermediários!
            </Subtitle>

            <BannerActions>
              <Button outline openLoginModal={() => this.openModal()}>participe agora mesmo</Button>
              <VideoButton openVideonModal={() => console.log('abre video')}>entenda como funciona</VideoButton>
            </BannerActions>

          </BannerContainer>

        </Banner>

        <BrandContainer>
          <BannerTitle>negociamos com as marcas que você confia</BannerTitle>
          <BrandImagesContainer>
            <BrandImage src="/static/images/logo-kitchen-aid.svg" alt="kitchen-aid" />
            <BrandImage src="/static/images/logo-brastemp.svg" alt="Brastemp" />
            <BrandImage src="/static/images/logo-consul.svg" alt="Consult" />
          </BrandImagesContainer>
        </BrandContainer>

        <WeAreNotContainer>
          <WeAreNot>
            <WeAreNotSubtitle>nãããão somos</WeAreNotSubtitle>
            <WeAreNotTitle>compra coletiva</WeAreNotTitle>
          </WeAreNot>
          
          <WeAreNotDescription>Entenda <span>como funciona</span> o passo a passo da negociação de cada Save até o momento da compra</WeAreNotDescription>
        </WeAreNotContainer>

        <ItWorkSection>
          <ItWorkContainer>
            <ItWorkImage src="/static/images/img-how-it-works-1.svg" alt="Passo 1 - Interesse" />
            <ItWorkInfos>
              <ItWorktTitle>interesse</ItWorktTitle>
              <ItWorkDescription>Você, assim como centenas de outras pessoas, aplica a um save, demonstrando seu interesse em um determinado produto (o tempo máximo que um save fica aberto para entrada de consumidores é de 10 dias).</ItWorkDescription>
            </ItWorkInfos>
          </ItWorkContainer>

          <ItWorkContainer className="reverse">
            <ItWorkImage src="/static/images/img-how-it-works-2.svg" alt="Passo 2 - Concorrência entre fabricantes" />
            <ItWorkInfos>
              <ItWorktTitle>Concorrência entre fabricantes</ItWorktTitle>
              <ItWorkDescription>Fechado o save (ninguém mais entra), o sistema libera uma única ordem para que os mais conceituados fabricantes daquele produto(já cadastrados no 99saves.com) enviem sua melhor oferta para atender aquela quantidade de pessoas (como se fossemos um grande varejista).</ItWorkDescription>
            </ItWorkInfos>
          </ItWorkContainer>

          <ItWorkContainer>
            <ItWorkImage src="/static/images/img-how-it-works-3.svg" alt="Passo 3 - Você dá sua opinião" />
            <ItWorkInfos>
              <ItWorktTitle>Você dá sua opinião</ItWorktTitle>
              <ItWorkDescription>A equipe de compras do 99saves.com analisa os melhores fornecedores e ofertas, seleciona as melhores (até 3) e disponibiliza para votação. A votação não é obrigatória e encerra-se automaticamente após 24 horas da sua abertura (cada participante tem direito a um voto).</ItWorkDescription>
            </ItWorkInfos>
          </ItWorkContainer>

          <ItWorkContainer className="reverse">
            <ItWorkImage src="/static/images/img-how-it-works-4.svg" alt="Passo 4 - A oferta vencedora fica disponível para compra" />
            <ItWorkInfos>
              <ItWorktTitle>A oferta vencedora fica disponível para compra</ItWorktTitle>
              <ItWorkDescription>Encerrada a pesquisa, automaticamente a oferta que teve o maior número de votos é liberada para compra através de um link em sua área do usuário, dentro do 99saves.com. </ItWorkDescription>
            </ItWorkInfos>
          </ItWorkContainer>

          <ItWorkContainer>
            <ItWorkImage src="/static/images/img-how-it-works-5.svg" alt="Passo 5 - A venda e a entrega será feita diretamente pelo fabricante" />
            <ItWorkInfos>
              <ItWorktTitle>A venda e a entrega será feita diretamente pelo fabricante</ItWorktTitle>
              <ItWorkDescription>Você acessa o link de compra em sua área do usuário no 99saves.com, é redirecionado para a compra dentro do site do fabricante pelo preço exclusivo que negociamos e ele realizará a entrega(nós estaremos de olho neste processo, apoiando no que for preciso). Lembre-se, você terá 48 horas para finalizar a compra ou seu link será inativado. </ItWorkDescription>
            </ItWorkInfos>
          </ItWorkContainer>

          <ItWorkContainer className="reverse">
            <ItWorkImage src="/static/images/img-how-it-works-6.svg" alt="Passo 6 - Você avalia a sua compra" />
            <ItWorkInfos>
              <ItWorktTitle>Você avalia a sua compra</ItWorktTitle>
              <ItWorkDescription>O 99saves.com só trabalha com os melhores. É por isso que você avaliará a sua satisfação com o fabricante, a entrega e o seu produto. Fabricantes que tiverem menos de 75% de satisfação dos usuários, serão automaticamente descadastrados da plataforma. Juntos, somos mais fortes, certo?
              </ItWorkDescription>
            </ItWorkInfos>
          </ItWorkContainer>

          <ItWorkContainer className="center">
            <Button outline openLoginModal={() => this.openModal()}>participe agora mesmo</Button>
          </ItWorkContainer>

        </ItWorkSection>

        <SaveSection>
          <SaveContainer>
            <SaveTitle>Saves</SaveTitle>
            <SaveSubtitle>Escolha o produto que te interessa e participe do save</SaveSubtitle>
            <SaveInfo>Lembre-se: aplique somente para aqueles que tiver real interesse de compra</SaveInfo>
          </SaveContainer>
        </SaveSection>

        <CardsList>
          {
            this.state.saves.rows && this.state.saves.rows.map(
              save =>
                <StyledCard
                  {...save}
                  key={save.id}
                  logged={this.state.logged}
                  openLoginModal={() => this.openModal(save.id)}
                  handleSubscribe={() => this.handleSubscribe(save.id)}
                />
            )
          }
        </CardsList>

        <ItWorkContainer className="center">
          <Button outline href="/saves">veja todos os saves</Button>
        </ItWorkContainer>

        <Footer />

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Login modal"
          style={modalStyles}
        >
          <ModalContent>
            <ModalHeading uppercase large>Agora falta só o login ;)</ModalHeading>
            <ModalText>
              Entre com o Facebook e receba as atualizações das negociações desse produto.
            </ModalText>
            <FacebookButton block onClick={() => this.handleLogin(this.state.subscribeTo)}>Entrar com o Facebook</FacebookButton>
          </ModalContent>
        </Modal>

        <Toast show={this.state.showToast}>
          Você receberá um email com atualizações sobre esta negociação.
        </Toast>
      </Page>
    );
  }
}

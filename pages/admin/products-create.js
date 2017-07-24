import React from 'react';
import request from 'superagent';
import Router from 'next/router';
import FRC, { Input, Row, Textarea, Select } from 'formsy-react-components';
import Loading from 'react-loading';
import CurrencyInput from 'react-currency-input';
import every from 'lodash/every';

import { pluralize } from '../../utils';
import RenderIf from '../../components/common/render-if';
import withAuth from '../../components/hoc/withAuth';
import config from '../../config';
import Layout from '../../components/admin/layout';
import AlertMessage from '../../components/common/alert-message';

class ProductsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_default: '',
      image2: '',
      image3: '',
      startDate: '',
      price: '',
      priceBuscape: '',
      list: [],
      btnEnabled: false,
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: '',
      selectOptions: [],
      selectProvider: [],
      coupons: [],
      cupom: '',
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleCouponsChange = this.handleCouponsChange.bind(this);
    this.handleCoupomChange = this.handleCoupomChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.getSaves();
    this.getProvider();
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  getSaves() {
    let list = [{ value: '', label: 'Selecione um registro' }];
    this.props.api
      .get('/cicles/all?negotiation=true')
      .then((response) => {
        response.data.map((item) => {
          list.push({ value: item.id, label: item.Save.title });
        });
        this.setState({ selectOptions: list });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProvider() {
    let list = [{ value: '', label: 'Selecione um registro' }];
    this.props.api
      .get('/providers')
      .then((response) => {
        response.data.rows.map((item) => {
          list.push({ value: item.id, label: item.name });
        });
        this.setState({ selectProvider: list });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchSubscriptionsCount(cicleId, retry = 0, max = 20) {
    if (retry <= max) {
      this.props.api
        .get(`/cicles/${cicleId}/subscriptions`)
        .then(({ data }) => {
          this.setState({ subscriptionCount: data.subscriptions.length });
        })
        .catch(() => this.fetchSubscriptionsCount(cicleId, retry + 1, max));
    }
  }

  handleSaveChange(fieldName, cicleId) {
    this.fetchSubscriptionsCount(cicleId);
  }

  handlePriceChange(key) {
    return (value) => this.setState({ [key]: value })
  }

  handleCoupomChange() {
    this.setState({ coupons: [] });
  }

  handleCouponsChange(event) {
    const [file] = event.target.files;
    const reader = new FileReader();
    const onLoadFinish = (coupons) => {
      this.setState({ coupons });
      this.setState({ cupom: '' });
    };

    reader.onload = function onload() {
      onLoadFinish(this.result.split('\n'));
    };
    reader.readAsText(file);
  }

  handleImageChange(event) {
    this.setState({ btnEnabled: true });
    this.handleImageUpload(event.target.files[0], event.target.name);
  }

  handleImageUpload(file, name) {
    const imageChange = {};
    const upload = request
      .post(config.CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', config.CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Problemas ao se comunicar com API: ${err}`
        });
        this.setState({ btnEnabled: false });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      }

      if (response.body.secure_url !== '') {
        imageChange[name] = response.body.secure_url;
        this.setState({ btnEnabled: false });
        this.setState(imageChange);
      }
    });
  }

  isFormValid(values) {
    return every(
      ['title', 'image_default', 'price', 'link_buy', 'CicleId', 'ProviderId', 'method_payment'],
      key => this.state[key] !== ''
    );
  }

  submitForm(data) {
    const values = Object.assign(data, {
      image_default: this.state.image_default,
      image2: this.state.image2,
      image3: this.state.image3,
      Coupons: this.state.coupons.map(coupon => ({ key: coupon })),
      price: this.state.price.replace(".", "").replace(",", "."),
      price_buscape: this.state.priceBuscape.replace(".", "").replace(",", ".")
    });

    if (!this.isFormValid(values) && (values.Coupons.length = 0 && values.cupom == '')) {
      this.setState({
        showToast: true,
        typeToast: 'warning',
        messageToast: 'Preencha todos os campos obrigatórios'
      });
      setTimeout(() => this.setState({ showToast: false }), 4500);
      return;
    }

    const { subscriptionCount } = this.state;

    if (values.cupom != '') {
        let arr = []
        for (let i=0; i< subscriptionCount; i++)
          arr.push({ key: values.cupom })
        values.Coupons = arr;
    }

    if (subscriptionCount > values.Coupons.length) {
      this.setState({
        showToast: true,
        typeToast: 'warning',
        messageToast: `
          A quantidade de cupons é menor que a de usuários inscritos.
          Insira ${subscriptionCount} ${pluralize(subscriptionCount, { 1: 'cupom', 2: 'cupons' })}.
        `
      });
      setTimeout(() => this.setState({ showToast: false }), 4500);
      return;
    }

    if (!values.image_default) delete values.image_default;
    if (!values.image2) delete values.image2;
    if (!values.image3) delete values.image3;

    const rest = this.props.api
      .post('/products', values)
      .then(() => {
        this.setState({
          showToast: true,
          typeToast: 'success',
          messageToast: 'Registro cadastrado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/products'), 2000);
      })
      .catch((error) => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: `Erro ao inserir (${error.message})`
        });
        setTimeout(() => this.setState({ showToast: false }), 2500);
      });

    return rest;
  }

  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <span className="panel-title">Cadastrar Produtos</span>
              </div>

              <div className="panel-body">
                <RenderIf expr={this.state.loading}>
                  <div className="pull-center">
                    <Loading type="bars" color="#000000" />
                  </div>
                </RenderIf>
                <RenderIf expr={!this.state.loading}>
                  <FRC.Form onSubmit={this.submitForm} layout="vertical">
                    <Input name="id" type="hidden" />
                    <Input
                      name="title"
                      value=""
                      id="title"
                      label="Título do produto"
                      type="text"
                      placeholder="Título do produto"
                      required
                      rowClassName="col-sm-12"
                    />
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="price">
                        Preço *
                      </label>
                      <div className="controls">
                        <CurrencyInput
                          name="price"
                          value={this.state.price}
                          id="price"
                          label="Preço"
                          placeholder="Preço"
                          className="form-control col-sm-3"
                          decimalSeparator=","
                          thousandSeparator="."
                          required
                          onChange={this.handlePriceChange('price')}
                        />
                      </div>
                    </div>
                    <Input
                      name="method_payment"
                      value=""
                      id="method_payment"
                      label="Formas de pagamentos"
                      type="text"
                      placeholder="Formas de pagamentos"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="link_buscape"
                      value=""
                      id="link_buscape"
                      label="Link Buscapé"
                      type="text"
                      placeholder="Link Buscapé"
                      rowClassName="col-sm-12"
                    />
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="price_buscape">
                        Preço Buscapé
                      </label>
                      <div className="controls">
                        <CurrencyInput
                          name="price_buscape"
                          value={this.state.priceBuscape}
                          id="price_buscape"
                          label="Menor preço buscapé"
                          placeholder="Menor preço buscapé"
                          className="form-control col-sm-3"
                          decimalSeparator=","
                          thousandSeparator="."
                          onChange={this.handlePriceChange('priceBuscape')}
                        />
                      </div>
                    </div>
                    <Input
                      name="link_buy"
                      value=""
                      id="link_buy"
                      label="link para compra na loja"
                      type="text"
                      placeholder="link para compra na loja"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Select
                      name="CicleId"
                      label="Save"
                      id="saveid"
                      help="Campo obriagatório"
                      options={this.state.selectOptions}
                      required
                      rowClassName="col-sm-12"
                      onChange={this.handleSaveChange}
                    />
                    <RenderIf expr={!!this.state.subscriptionCount}>
                      <div className="form-group col-sm-12">
                        <div className="alert alert-info">
                          A quantidade de usuários inscritos nesse save é de {this.state.subscriptionCount}.
                          Insira a mesma quantidade de cupons.
                        </div>
                      </div>
                    </RenderIf>

                    <Input
                      name="cupom"
                      value=""
                      id="cupom"
                      label="Cupom único"
                      value={this.state.cupom}
                      type="text"
                      placeholder="Preencha o cupom que será igual para todas as inscrições"
                      rowClassName="col-sm-12"
                      onChange={this.handleCoupomChange}
                    />
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="coupons">
                          Cupons (um cupom por linha) *
                        </label>
                      <div className="controls">
                        <input
                          type="file"
                          accept="text/plain"
                          name="coupons"
                          onChange={this.handleCouponsChange}
                        />
                      </div>
                    </div>
                    <Select
                      name="ProviderId"
                      label="Fornecedor"
                      id="providerd"
                      help="Campo obriagatório"
                      options={this.state.selectProvider}
                      required
                      rowClassName="col-sm-12"
                    />
                    <Textarea
                      rows={10}
                      cols={40}
                      name="description"
                      value=""
                      label="Descrição do produto"
                      placeholder="Descrição"
                      rowClassName="col-sm-12"
                    />
                    <Textarea
                      rows={10}
                      cols={40}
                      name="technique_information"
                      value=""
                      label="Informações técnicas"
                      placeholder="Informações técnicas"
                      rowClassName="col-sm-12"
                    />
                    <div className="form-group col-sm-12">
                      <label
                        className="control-label"
                        htmlFor="image_default"
                      >
                          Imagem de destaque *
                        </label>
                      <div className="controls">
                        <input
                          type="file"
                          name="image_default"
                          required
                          onChange={this.handleImageChange}
                        />
                      </div>

                      <RenderIf expr={!!this.state.image_default}>
                        <div className="controls">
                          <img className="col-md-3" src={this.state.image_default} alt="image" />
                        </div>
                      </RenderIf>
                    </div>
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="image2">
                          Outra imagem
                        </label>
                      <div className="controls">
                        <input
                          type="file"
                          name="image2"
                          onChange={this.handleImageChange}
                        />
                      </div>

                      <RenderIf expr={!!this.state.image2}>
                        <div className="controls">
                          <img className="col-md-3" src={this.state.image2} alt="image" />
                        </div>
                      </RenderIf>
                    </div>
                    <div className="form-group col-sm-12">
                      <label className="control-label" htmlFor="image3">
                          Outra imagem
                        </label>
                      <div className="controls">
                        <input
                          type="file"
                          name="image3"
                          onChange={this.handleImageChange}
                        />
                      </div>

                      <RenderIf expr={!!this.state.image3}>
                        <div className="controls">
                          <img className="col-md-3" src={this.state.image3} alt="image" />
                        </div>
                      </RenderIf>
                    </div>
                    <RenderIf expr={this.state.btnEnabled}>
                      <div className="form-group col-sm-12">
                        <Loading type="bars" color="#000000" />
                      </div>
                    </RenderIf>
                    <Row layout="vertical" rowClassName="col-sm-12">
                      <div className="text-left">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          defaultValue="Enviar"
                          disabled={this.state.btnEnabled ? 'disabled' : ''}
                        />
                      </div>
                    </Row>
                  </FRC.Form>
                </RenderIf>
              </div>
            </div>
          </div>
        </div>
        <AlertMessage type={this.state.typeToast} show={this.state.showToast}>
          {this.state.messageToast}
        </AlertMessage>
      </Layout>
    );
  }
}

export default withAuth({ isAdminPage: true })(ProductsCreate);

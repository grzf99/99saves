import React from 'react';
import request from 'superagent';
import Router from 'next/router';
import FRC, { Input, Row, Textarea, Select } from 'formsy-react-components';
import Loading from 'react-loading';

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
      list: [],
      loading: true,
      showToast: false,
      messageToast: '',
      typeToast: '',
      selectOptions: [],
      selectProvider: [],
      coupons: []
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleCouponsChange = this.handleCouponsChange.bind(this);
    this.handleSaveChange = this.handleSaveChange.bind(this);
    this.getSaves();
    this.getProvider();
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  getSaves() {
    let list = [{ value: '', label: 'Selecione um registro' }];
    this.props.api
      .get('/saves')
      .then((response) => {
        response.data.map((item) => {
          list.push({ value: item.id, label: item.title });
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

  fetchSubscriptionsCount(saveId, retry = 0, max = 20) {
    if (retry <= max) {
      this.props.api
        .get(`/saves/${saveId}/subscriptions`)
        .then(({ data }) => {
          this.setState({ subscriptionCount: data.subscriptions.length });
        })
        .catch(() => this.fetchSubscriptionsCount(saveId, retry + 1, max));
    }
  }

  handleSaveChange(fieldName, saveId) {
    this.fetchSubscriptionsCount(saveId);
  }

  handleCouponsChange(event) {
    const [file] = event.target.files;
    const reader = new FileReader();
    const onLoadFinish = (coupons) => {
      this.setState({ coupons });
    };

    reader.onload = function onload() {
      onLoadFinish(this.result.split('\n'));
    };
    reader.readAsText(file);
  }

  handleImageChange(event) {
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
        setTimeout(() => this.setState({ showToast: false }), 2500);
      }

      if (response.body.secure_url !== '') {
        imageChange[name] = response.body.secure_url;
        this.setState(imageChange);
      }
    });
  }

  isFormValid(values) {
    return values.title && values.image_default;
  }

  submitForm(data) {
    const values = Object.assign(data, {
      image_default: this.state.image_default,
      image2: this.state.image2,
      image3: this.state.image3,
      Coupons: this.state.coupons.map(coupon => ({ key: coupon }))
    });

    if (!this.isFormValid(values)) {
      this.setState({
        showToast: true,
        typeToast: 'warning',
        messageToast: 'Preencha todos os campos obrigatórios'
      });
      setTimeout(() => this.setState({ showToast: false }), 4500);
      return;
    }

    const { subscriptionCount } = this.state;
    if (subscriptionCount > values.coupons.length) {
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
          messageToast: 'Registro cadsatrado com Sucesso'
        });
        setTimeout(() => Router.push('/admin/products'), 2000);
      })
      .catch(() => {
        this.setState({
          showToast: true,
          typeToast: 'warning',
          messageToast: 'Erro ao inserir o registro'
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
                {this.state.loading
                  ? <div className="pull-center">
                    <Loading type="bars" color="#000000" />
                  </div>
                  : <FRC.Form onSubmit={this.submitForm} layout="vertical">
                    <Input name="id" type="hidden" />
                    <Input
                      name="title"
                      value=""
                      id="title"
                      label="Título do save"
                      type="text"
                      placeholder="Título do save"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="price"
                      value=""
                      id="price"
                      label="Preço"
                      type="text"
                      placeholder="Preço"
                      required
                      rowClassName="col-sm-12"
                    />
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
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="price_buscape"
                      value=""
                      id="price_buscape"
                      label="Menor preço buscapé"
                      type="text"
                      placeholder="Menor preço buscapé"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Input
                      name="link_buy"
                      value=""
                      id="link_buy"
                      label="Link de compra"
                      type="text"
                      placeholder="Link de compra"
                      required
                      rowClassName="col-sm-12"
                    />
                    <Select
                      name="SaveId"
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
                      rows={3}
                      cols={40}
                      name="technique_information"
                      value=""
                      label="Informações técnicas"
                      placeholder="Informações técnicas"
                      rowClassName="col-sm-12"
                    />
                    <Textarea
                      rows={3}
                      cols={40}
                      name="description"
                      value=""
                      label="Descrição do save"
                      placeholder="Descrição"
                      rowClassName="col-sm-12"
                    />
                    <div className="form-group col-sm-12">
                      <label
                        className="control-label"
                        htmlFor="image_default"
                      >
                          Imagem de destaque
                        </label>
                      <div className="controls">
                        <input
                          type="file"
                          name="image_default"
                          onChange={this.handleImageChange}
                        />
                      </div>
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
                    </div>
                    <Row layout="vertical" rowClassName="col-sm-12">
                      <div className="text-left">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          defaultValue="Enviar"
                        />
                      </div>
                    </Row>
                  </FRC.Form>}
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

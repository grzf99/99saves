const express = require('express');
const { compileTemplate } = require('../../utils/mailers');

const router = express.Router();

router.get('/signup-welcome', async (req, res) => {
  const user = {
    email: 'diogo.beda@helabs.com'
  };
  const profile = {
    name: 'Diogo Beda',
    cpf: '111.111.111-11',
    city: 'Goiania',
    state: 'GO'
  };
  const result = await compileTemplate('mailers/signup-welcome.hbs', {
    user,
    profile
  });
  res.status(200).send(result);
});

router.get('/votation-start', async (req, res) => {
  const save = {
    id: 1,
    title: 'Máquina de lavar',
    slug: 'maquina-de-lavar-1',
    Products: [
      {
        id: 1,
        title: 'Máquina de Lavar | Lavadora de Roupa Brastemp Clean Automática Turbo Performance 10Kg Branca - BWC10BB',
        image_default: 'http://images.maquinadevendas.com.br/370x370/produto/246273_5026290_20161003161856.jpg',
        price: 1299.00,
        method_payment: 'em até 10x sem juros',
        Provider: {
          id: 1,
          name: 'Brastemp'
        }
      },
      {
        id: 2,
        title: 'Lavadora de Roupas Consul CWC08ABANA - 8Kg',
        image_default: 'https://c.mlcdn.com.br/470x352/lavadora-de-roupas-consul-cwc08abana8kg-084276700.jpg',
        price: 854.91,
        method_payment: 'em até 6x sem juros',
        Provider: {
          id: 2,
          name: 'Consul'
        }
      }
    ]
  };

  const result = await compileTemplate('mailers/votation-start.hbs', { save });
  res.status(200).send(result);
});

router.get('/purchase-start', async (req, res) => {
  const save = {
    id: 1,
    title: 'Máquina de lavar',
    slug: 'maquina-de-lavar-1',
    checkout_end: new Date()
  };
  const product = {
    id: 1,
    title: 'Máquina de Lavar | Lavadora de Roupa Brastemp Clean Automática Turbo Performance 10Kg Branca - BWC10BB',
    image_default: 'http://images.maquinadevendas.com.br/370x370/produto/246273_5026290_20161003161856.jpg',
    price: 1299,
    price_buscape: 1400,
    date_buscape: new Date(),
    method_payment: 'em até 10x sem juros',
    Provider: {
      id: 1,
      name: 'Brastemp',
      logo: 'https://mainaranobrega.files.wordpress.com/2015/06/brastemp-svg.png'
    }
  };

  const result = await compileTemplate('mailers/purchase-start.hbs', {
    save,
    product
  });
  res.status(200).send(result);
});

router.get('/last-chance', async (req, res) => {
  const save = {
    id: 2,
    title: 'Máquina de lavar',
    slug: 'maquina-de-lavar-1',
    checkout_end: new Date()
  };
  const product = {
    id: 1,
    title: 'Máquina de Lavar | Lavadora de Roupa Brastemp Clean Automática Turbo Performance 10Kg Branca - BWC10BB',
    image_default: 'http://images.maquinadevendas.com.br/370x370/produto/246273_5026290_20161003161856.jpg',
    price: 1299,
    price_buscape: 1400,
    date_buscape: new Date(),
    method_payment: 'em até 10x sem juros',
    Provider: {
      id: 1,
      name: 'Brastemp',
      logo: 'https://mainaranobrega.files.wordpress.com/2015/06/brastemp-svg.png'
    }
  };

  const result = await compileTemplate('mailers/last-chance.hbs', {
    save,
    product
  });
  res.status(200).send(result);
});

module.exports = router;

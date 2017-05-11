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

module.exports = router;

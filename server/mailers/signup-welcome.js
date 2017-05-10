const juice = require('juice');
const { sendMail, compileTemplate } = require('../../utils/mailers');

module.exports = {
  async mail(to, context) {
    const content = await compileTemplate(
      'mailers/signup-welcome.hbs',
      context
    );
    try {
      await sendMail('Bem-vindo(a) ao 99saves!', to, juice(content));
    } catch (err) {
      console.log(err);
    }
  }
};

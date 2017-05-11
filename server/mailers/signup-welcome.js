const juice = require('juice');
const { sendMail, compileTemplate } = require('../../utils/mailers');

module.exports = {
  async mail(to, context) {
    try {
      const content = await compileTemplate(
        'mailers/signup-welcome.hbs',
        context
      );
      return await sendMail('Bem-vindo(a) ao 99saves!', to, juice(content));
    } catch (err) {
      console.log(err);
    }
  }
};

const compileTemplate = require('../../utils/compileTemplate');
const { sendHtmlMail } = require('../../utils/mailClient');

module.exports = {
  async mail(to, context) {
    const content = await compileTemplate(
      'mailers/signup-welcome.hbs',
      context
    );
    try {
      await sendHtmlMail('Bem-vindo(a) ao 99saves!', to, content);
    } catch (err) {
      console.log(err);
    }
  }
};

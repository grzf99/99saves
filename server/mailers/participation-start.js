const juice = require('juice');
const { sendMail, compileTemplate } = require('../../utils/mailers');

module.exports = {
  async mail(to, context) {
    try {
      const content = await compileTemplate(
        'mailers/participation-start.hbs',
        context
      );
      return await sendMail(`Você está participando do save ${context.save.title}!`, to, juice(content));
    } catch (err) {
      console.log(err);
    }
  }
};

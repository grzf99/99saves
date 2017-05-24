const queue = require('../delayed-jobs');

module.exports = {
  mail(user) {
    global.queue
      .create('email', {
        to: user.email,
        subject: 'Pedido de redefinição de senha',
        template: 'mailers/forgot-password.hbs',
        context: { user }
      })
      .removeOnComplete(true)
      .save();
  }
};

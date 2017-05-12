const juice = require('juice');
const { compileTemplate, sendMail } = require('../../utils/mailers');

module.exports = async (job, done) => {
  console.log('running email job');
  const { to, subject, template, context } = job.data;
  try {
    const content = await compileTemplate(template, context);
    console.log(`sending mail to ${to}`);
    await sendMail(subject, to, juice(content));
    done();
  } catch (err) {
    console.log(err);
    done(err);
  }
};

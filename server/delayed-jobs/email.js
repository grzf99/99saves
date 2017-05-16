const juice = require('juice');
const { compileTemplate, sendMail } = require('../../utils/mailers');

module.exports = async (job, done) => {
  const { to, subject, template, context } = job.data;
  console.log(`sending mail to ${to}`);
  try {
    const content = await compileTemplate(template, context);
    await sendMail(subject, to, juice(content));
    done();
  } catch (err) {
    console.log(err);
    done(err);
  }
};

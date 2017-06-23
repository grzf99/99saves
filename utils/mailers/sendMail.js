const Sendgrid = require('sendgrid');
const { mail } = require('sendgrid');
const { EMAIL_SENDER } = require('../../config');

const sg = Sendgrid(process.env.SENDGRID_API_KEY);

function createMail(subject, to, contentType, contentString) {
  const fromEmail = new mail.Email(EMAIL_SENDER, '99saves');
  const toEmail = new mail.Email(to);
  const content = new mail.Content(contentType, contentString);

  return new mail.Mail(fromEmail, subject, toEmail, content);
}

module.exports = (subject, to, html) => {
  const body = createMail(subject, to, 'text/html', html);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: body.toJSON()
  });

  return sg.API(request);
};

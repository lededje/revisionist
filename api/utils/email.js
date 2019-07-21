const mailgun = require('mailgun-js');

const { MAILGUN_API_DOMAIN, MAILGUN_API_KEY } = process.env;

const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_API_DOMAIN });

const email = async ({
  from = 'The Revisionist <revisionist@miles.dev>',
  to,
  subject,
  text,
  html,
}) => {
  await mg.messages().send({
    from,
    to,
    subject,
    text,
    html,
  });
};

module.exports = email;

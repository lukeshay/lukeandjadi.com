import sgMail from '@sendgrid/mail';
import config from 'config';

const domain: string = config.get('domain');
const from: string = config.get('email.from');

const configure = () => {
  sgMail.setApiKey(config.get('sendgrid.apiKey'));
};

const getJWTEmailHtml = (jwtToken: string): string => {
  return `
  <p><h3>Hello!</h3></p>
  <p>Thank you for coming to our wedding website! <a href="${domain}/account?token=${jwtToken}">Here is your link to sign in.</a></p>
  <p><b>Luke Shay & Jadi Reding</b>
  <br>
  <a href="mailto:${from}">${from}</a>
  <br>
  <a about="_blank" href="${domain}">${domain}</a></p>
`;
};

const getJWTEmailPlain = (jwtToken: string): string => {
  return `Hello!

  Thank you for coming to our wedding website! ${domain}/account?token=${jwtToken}

  Luke Shay & Jadi Reding
  ${from}
  ${domain}
`;
};

const sendEmail = (...data: sgMail.MailDataRequired[]) => {
  configure();

  return sgMail.send(data);
};

const sendJWTEmail = async (email: string, jwtToken: string) => {
  const html = getJWTEmailHtml(jwtToken);
  const text = getJWTEmailPlain(jwtToken);

  const result = await sendEmail({
    from: `Luke & Jadi <${config.get('email.from')}>`,
    subject: "Sign in link for Luke & Jadi's wedding website",
    html,
    text,
    to: email,
  });

  return result[0].toString();
};

export { sendJWTEmail };

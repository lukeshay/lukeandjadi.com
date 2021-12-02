import config from './config';

export function getJWTEmailHtml(jwtToken: string) {
  return `
  <p><h3>Hello!</h3></p>
  <p>Thank you for coming to our wedding website! <a href="${config.env.domain}/account?token=${jwtToken}">Here is your link to sign in.</a></p>
  <p><b>Luke Shay & Jadi Reding</b>
  <br>
  <a href="mailto:${config.env.emailFrom}">${config.env.emailFrom}</a>
  <br>
  <a about="_blank" href="${config.env.domain}">${config.env.domain}</a></p>
`;
}

export function getJWTEmailPlain(jwtToken: string) {
  return `Hello!

  Thank you for coming to our wedding website! ${config.env.domain}/account?token=${jwtToken}

  Luke Shay & Jadi Reding
  ${config.env.emailFrom}
  ${config.env.domain}
`;
}

import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendJWTEMail(
  to: string,
  subject: string,
  html: string,
): Promise<any> {
  const info = await transporter.sendMail({
    from: `"Luke & Jadi" <${process.env.EMAIL_FROM || 'luke@lukeandjadi.com'}>`,
    to,
    subject,
    html,
  });

  return info;
}

export function getJWTEmailHtml(jwtToken: string) {
  return `
  <p><h3>Hello!</h3></p>
  <p>Thank you for coming to our wedding website! <a href="${
    process.env.REDIRECT_URI || 'https://lukeandjadi.com'
  }/account?token=${jwtToken}">Here is your link to sign in.</a></p>
  <p><b>Luke Shay & Jadi Reding</b>
  <br>
  <a href="mailto:${process.env.EMAIL_FROM || 'luke@lukeandjadi.com'}">${
    process.env.EMAIL_FROM || 'luke@lukeandjadi.com'
  }</a>
  <br>
  <a about="_blank" href="${
    process.env.REDIRECT_URI || 'https://lukeandjadi.com'
  }">${process.env.REDIRECT_URI || 'https://lukeandjadi.com'}</a></p>
`;
}

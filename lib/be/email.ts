import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'santina.eichmann@ethereal.email',
    pass: 'XN4ZD4nJEC9ZgQfzxX',
  },
});

export async function sendJWTEMail(
  email: string,
  jwtToken: string,
): Promise<any> {
  return transporter.sendMail({
    from: '"Luke & Jadi" <shay.luke17@gmail.com>',
    to: email,
    subject: 'Signin link for lukeandjadi.com',
    html: `
        <p><b>Hello!</b></p>
        <p>Thank you for coming to our wedding website! <a href="${
          process.env.REDIRECT_URI || 'https://lukeandjadi.com'
        }/account/auth?token=${jwtToken}">Here is your link to sign in.</a></p>
    `,
  });
}

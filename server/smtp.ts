import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export function sendEmail(...data: sgMail.MailDataRequired[]) {
  return sgMail.send(data);
}

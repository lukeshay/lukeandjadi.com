const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body, null, 2),
});

const isString = (val) => typeof val === 'string';

export const email = (event, context, cb) => {
  const { to, html, from, text, user, pass, host, subject } = JSON.parse(
    event.body,
  );

  const responseBody = {};

  if (!isString(to)) {
    responseBody.error = true;
    responseBody.to = 'required field';
  }

  if (!isString(html)) {
    responseBody.error = true;
    responseBody.html = 'required field';
  }

  if (!isString(from)) {
    responseBody.error = true;
    responseBody.from = 'required field';
  }

  if (!isString(text)) {
    responseBody.error = true;
    responseBody.text = 'required field';
  }

  if (!isString(user)) {
    responseBody.error = true;
    responseBody.user = 'required field';
  }

  if (!isString(pass)) {
    responseBody.error = true;
    responseBody.pass = 'required field';
  }

  if (!isString(host)) {
    responseBody.error = true;
    responseBody.host = 'required field';
  }

  if (!isString(subject)) {
    responseBody.error = true;
    responseBody.subject = 'required field';
  }

  if (responseBody.error) {
    cb(null, response(400, responseBody));
    return;
  }

  if (
    host !== process.env.EMAIL_HOST ||
    user !== process.env.EMAIL_USER ||
    pass !== process.env.EMAIL_PASS
  ) {
    cb(null, response(401, {}));
    return;
  }

  cb(
    null,
    response(200, {
      message: 'Your email has been queued!',
    }),
  );

  transporter
    .sendMail({
      from,
      to,
      subject,
      html,
      text,
    })
    .catch((e) => console.error(e));
};

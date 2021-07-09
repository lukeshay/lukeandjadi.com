/* eslint-disable */
function formEncode(body) {
  const formBody = [];

  for (const property in body) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(body[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }

  return formBody.join('&');
}

export function send({ to, from, subject, text, html }) {
  const actualBody = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from },
    subject,
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html },
    ],
  };

  return fetch('https://api.sendgrid.com/v3/mail/send', {
    body: JSON.stringify(actualBody),
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${SENDGRID_KEY}`,
    },
    method: 'POST',
  });
}

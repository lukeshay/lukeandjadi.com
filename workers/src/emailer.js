import { send } from './lib/smtp';
import { jsonResponse } from './lib/response';

const isString = (val) => typeof val === 'string';

function updateIfNotString(str, responseBody) {
  if (!isString(str)) {
    // eslint-disable-next-line no-param-reassign
    responseBody.error = true;
    return 'required field';
  }

  return undefined;
}

function authorized(host, user, pass) {
  return host !== EMAIL_HOST || user !== EMAIL_USER || pass !== EMAIL_PASS;
}

// eslint-disable-next-line no-restricted-globals
addEventListener('fetch', (event) => {
  event.respondWith(
    event.request.method !== 'GET' && event.request.method !== 'POST'
      ? new Response()
      : handleErrors(event.request, handleRequest),
  );
});

async function handleErrors(request, handler) {
  try {
    return await handler(request);
  } catch (e) {
    return jsonResponse({ message: e.message, error: e }, { status: 500 });
  }
}

async function handleRequest(request) {
  const { to, html, from, text, user, pass, host, subject } =
    await request.json();

  const responseBody = {};

  responseBody.from = updateIfNotString(from, responseBody);
  responseBody.host = updateIfNotString(host, responseBody);
  responseBody.html = updateIfNotString(html, responseBody);
  responseBody.pass = updateIfNotString(pass, responseBody);
  responseBody.subject = updateIfNotString(subject, responseBody);
  responseBody.text = updateIfNotString(text, responseBody);
  responseBody.to = updateIfNotString(to, responseBody);
  responseBody.user = updateIfNotString(user, responseBody);

  const headers = new Headers();

  headers.set('Content-type', 'application/json');

  if (responseBody.error) {
    return jsonResponse(responseBody, { status: 400 });
  }

  if (authorized(host, user, pass)) {
    return jsonResponse({}, { status: 401 });
  }

  await send({
    to,
    from,
    subject,
    html,
    text,
  });

  return jsonResponse({ message: 'Your email has been queued!' });
}

export function jsonResponse(body, opts = {}) {
  const options = { status: 200, headers: new Headers(), ...opts };

  options.headers.set('Content-type', 'application/json');

  return new Response(JSON.stringify(body), options);
}

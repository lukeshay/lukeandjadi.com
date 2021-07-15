(() => {
  'use strict';
  function t(t, e = {}) {
    const s = { status: 200, headers: new Headers(), ...e };
    return (
      s.headers.set('Content-type', 'application/json'),
      new Response(JSON.stringify(t), s)
    );
  }
  function e(t, e) {
    if ('string' != typeof t) return (e.error = !0), 'required field';
  }
  async function s(s) {
    const {
        to: n,
        html: r,
        from: o,
        text: a,
        user: i,
        pass: u,
        host: c,
        subject: m,
      } = await s.json(),
      p = {};
    return (
      (p.from = e(o, p)),
      (p.host = e(c, p)),
      (p.html = e(r, p)),
      (p.pass = e(u, p)),
      (p.subject = e(m, p)),
      (p.text = e(a, p)),
      (p.to = e(n, p)),
      (p.user = e(i, p)),
      new Headers().set('Content-type', 'application/json'),
      p.error
        ? t(p, { status: 400 })
        : (function (t, e, s) {
            return t !== EMAIL_HOST || e !== EMAIL_USER || s !== EMAIL_PASS;
          })(c, i, u)
        ? t({}, { status: 401 })
        : (await (function ({ to: t, from: e, subject: s, text: n, html: r }) {
            const o = {
              personalizations: [{ to: [{ email: t }] }],
              from: { email: e },
              subject: s,
              content: [
                { type: 'text/plain', value: n },
                { type: 'text/html', value: r },
              ],
            };
            return fetch('https://api.sendgrid.com/v3/mail/send', {
              body: JSON.stringify(o),
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${SENDGRID_KEY}`,
              },
              method: 'POST',
            });
          })({ to: n, from: o, subject: m, html: r, text: a }),
          t({ message: 'Your email has been queued!' }))
    );
  }
  addEventListener('fetch', (e) => {
    e.respondWith(
      'GET' !== e.request.method && 'POST' !== e.request.method
        ? new Response()
        : (async function (e, s) {
            try {
              return await s(e);
            } catch (e) {
              return t({ message: e.message, error: e }, { status: 500 });
            }
          })(e.request, s),
    );
  });
})();

export function getRecaptchaToken() {
  return new Promise((resolve) => {
    // @ts-expect-error
    window.grecaptcha.ready(() => {
      // @ts-expect-error
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action: 'submit',
        })
        .then((token: string) => {
          resolve(token);
        });
    });
  });
}

import config from './config';

export const getRecaptchaToken = (): Promise<string> => {
  return new Promise((resolve) => {
    // @ts-expect-error
    window.grecaptcha.ready(() => {
      // @ts-expect-error
      window.grecaptcha
        .execute(config.env.recaptchaSiteKey, {
          action: 'submit',
        })
        .then((token: string) => {
          resolve(token);
        });
    });
  });
};

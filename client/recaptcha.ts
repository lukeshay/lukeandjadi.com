import config from './config';

/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
export const getRecaptchaToken = async (): Promise<string> =>
    new Promise((resolve) => {
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
/* eslint-enable */

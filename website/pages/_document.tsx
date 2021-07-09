import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import config from '../lib/client/config';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@300;500;700&display=swap"
            rel="stylesheet"
          />
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${config.env.recaptchaSiteKey}`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

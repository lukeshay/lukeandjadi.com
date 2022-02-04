import type { DocumentProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { datadogLogs } from '@datadog/browser-logs';

import config from '../client/config';

class MyDocument extends Document {
  public constructor(props: DocumentProps) {
    super(props);

    datadogLogs.init({
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? '',
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
      env: process.env.VERCEL_ENV,
      version: process.env.VERCEL_GIT_COMMIT_SHA,
      service: 'lukeandjadi.com',
    });
  }

  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/OleoScriptSwashCaps-Bold.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/OleoScriptSwashCaps-Regular.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-Black.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-BlackItalic.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-Bold.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-BoldItalic.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-ExtraLight.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-ExtraLightItalic.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-Light.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-LightItalic.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-Regular.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-Italic.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-SemiBold.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin="anonymous"
            href="/fonts/SourceSerifPro-SemiBoldItalic.woff2"
            rel="preload"
            type="font/woff2"
          />
          <script async src={`https://www.google.com/recaptcha/api.js?render=${config.env.recaptchaSiteKey}`} />
        </Head>
        <body className="font-serif tracking-wide">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

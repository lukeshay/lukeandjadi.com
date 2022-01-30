import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document';
import config from '../client/config';
import { datadogLogs } from '@datadog/browser-logs';

class MyDocument extends Document {
  constructor(props: DocumentProps) {
    super(props);

    datadogLogs.init({
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
      env: process.env.VERCEL_ENV,
      version: process.env.VERCEL_GIT_COMMIT_SHA,
      service: 'lukeandjadi.com',
    });
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/OleoScriptSwashCaps-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/OleoScriptSwashCaps-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-Black.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-BlackItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-BoldItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-ExtraLight.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-ExtraLightItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-LightItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-SemiBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SourceSerifPro-SemiBoldItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${config.env.recaptchaSiteKey}`}
            async
          />
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

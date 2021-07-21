import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document';
import config from '@/lib/client/config';
import { datadogLogs } from '@datadog/browser-logs';

class MyDocument extends Document {
  constructor(props: DocumentProps) {
    super(props);

    datadogLogs.init({
      clientToken: 'pubbedc348b2a152c2fe4fe7649fc7f1f2e',
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
    });
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@300;500;700&display=swap"
            rel="stylesheet"
          />
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${config.env.recaptchaSiteKey}`}
            async
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

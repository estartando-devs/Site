import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Analytics } from '../components/Analytics';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <Analytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

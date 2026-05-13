import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { Open_Sans, Ubuntu } from 'next/font/google';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import SEO from '../../next-seo.config';
import '../styles/globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-open-sans',
});

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-ubuntu',
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} ${ubuntu.variable}`}>
      <Head>
        <meta
          name="google-site-verification"
          content="8kDtWUmUQEh7QXoj_shRaxcgYAVpHs_YQ7TeniN0kmI"
        />
        <meta name="theme-color" content="#81CAA8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#81CAA8" />
        <meta name="msapplication-navbutton-color" content="#81CAA8" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <DefaultSeo {...SEO} />
      <NextNProgress
        color="#81CAA8"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </div>
  );
}

export default App;

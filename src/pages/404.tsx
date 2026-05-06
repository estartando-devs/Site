import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Footer, Layout, Logo, Typography } from '../components';

export default function NotfoundPage() {
  return (
    <Layout full>
      <NextSeo title="404" description="Oops! Página não encontrada.." />
      <div className="h-full flex flex-col gap-8">
        <div className="p-10">
          <header>
            <Link href="/">
              <Logo width={48} height={68} priority quality={30} />
            </Link>
          </header>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center px-10">
          <Typography variant="h1" className="text-white">
            Oops! Página não encontrada.
          </Typography>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

import { NextSeo } from 'next-seo';
import { Footer, IdCardForm, Layout } from '../../components';

export default function IdCard() {
  return (
    <Layout>
      <NextSeo
        title="Id Card"
        description="Crie seu ID Card personalizado e divulge nas suas redes. Não esqueça de nos marcar."
        openGraph={{
          url: 'https://estartandodevs.com.br/id-card',
        }}
        nofollow
        noindex
      />
      <div className="min-h-screen flex flex-col">
        <IdCardForm />
        <Footer />
      </div>
    </Layout>
  );
}

import { NextSeo } from 'next-seo';
import { Footer, IdCardForm, Layout } from '../../../components';

export default function IdCardTeam() {
  return (
    <Layout>
      <NextSeo
        title="Id Card Time"
        description="Crie seu ID Card personalizado e divulge nas suas redes. Não esqueça de nos marcar."
        openGraph={{
          url: 'https://estartandodevs.com.br/id-card/time',
        }}
        noindex
        nofollow
      />
      <div className="min-h-screen flex flex-col">
        <IdCardForm team />
        <Footer />
      </div>
    </Layout>
  );
}

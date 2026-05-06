import { Layout } from '@/components';
import { Subscriber } from '@/components/subscriber';
import { NextSeo } from 'next-seo';

export default function InscricaoPage() {
  return (
    <Layout>
      <NextSeo
        title="Inscrição"
        description="Faça sua inscrição para os cursos do Estartando Devs."
        openGraph={{
          url: 'https://estartandodevs.com.br/inscricao',
        }}
      />
      <Subscriber />
    </Layout>
  );
}

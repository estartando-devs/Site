import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../components';
import {
  IdCard as IdCardComponent,
  IdCardProps,
} from '../../components/IdCard';
import { NotFoundIdCard } from '../../components/NotFoundIdCard';

export default function MyIdCard() {
  const router = useRouter();
  const { isReady, query } = router;
  const [profile, setProfile] = useState<IdCardProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    const { name, course, city, state, team } = query;

    if (!name || !course) {
      setError('Missing required information');
      setLoading(false);
      return;
    }

    // Get image from sessionStorage (client-side only)
    const storageImage = sessionStorage.getItem('id-card-image');
    let imageSrc = 'https://res.cloudinary.com/elite-devs/images/logo';

    if (storageImage) {
      try {
        const value = JSON.parse(storageImage);
        if (value?.image?.src) imageSrc = value.image.src;
      } catch (e) {
        console.error('Error parsing storage image', e);
      }
    }

    setProfile({
      name: name as string,
      image: {
        src: imageSrc,
        alt: `imagem aluno(a) ${name}`,
      },
      course: course as string,
      team: team === 'true',
      address: {
        city: (city as string) || 'Rio de Janeiro',
        state: (state as string) || 'RJ',
      },
    });
    setLoading(false);
  }, [isReady, query]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-teal"></div>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <NotFoundIdCard />
      </Layout>
    );
  }

  return (
    <Layout>
      <NextSeo
        title={`Id Card - @${profile.name}`}
        description="Agora você pode compartilhar seu id card. Não esqueça de nos marcar."
        openGraph={{
          url: 'https://estartandodevs.com.br/id-card',
        }}
        nofollow
        noindex
      />
      <div className="flex flex-col justify-center items-center h-full p-8">
        <IdCardComponent {...profile} />
      </div>
    </Layout>
  );
}

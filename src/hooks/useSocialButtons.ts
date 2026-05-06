import { Github, Instagram, Linkedin } from 'lucide-react';
import { useMemo } from 'react';

type SocialLink = {
  iconProps: {
    className?: string;
    size?: number;
  };
  title: string;
  href: string;
  icon: any;
};

export const useSocialButtons = () => {
  const socialLinks: Array<SocialLink> = useMemo(
    () => [
      {
        iconProps: {
          size: 20,
          className: 'text-white',
        },
        title: 'Seguir nosso perfil no instagram.',
        href: 'https://www.instagram.com/estartandodevs/',
        icon: Instagram,
      },
      {
        iconProps: {
          size: 20,
          className: 'text-white',
        },
        title: 'Acessar página no linkedin.',
        href: 'https://br.linkedin.com/company/estartando-devs',
        icon: Linkedin,
      },
      {
        iconProps: {
          size: 20,
          className: 'text-white',
        },
        title: 'Acessar repositório no github.',
        href: 'https://github.com/estartando-devs',
        icon: Github,
      },
    ],
    [],
  );

  return {
    socialLinks,
  };
};

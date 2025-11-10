/* eslint-disable @next/next/no-img-element */
import * as S from './styles';

const modalities = [
  {
    badge: 'Em breve!',
    title: 'Estartando',
    bg: '/estartando.png',
    description:
      'Módulo Iniciante - Neste formato, você terá acesso às aulas gravadas com conteúdos básicos dos três cursos para esquentar seus estudos na área de tecnologia.',
    list: [
      'Mentoria;',
      'Acesso à comunidade no Discord;',
      'Eventos;',
      '1 ano de acesso para os três cursos (Front, Back e Design).',
    ],
    button: {
      text: 'Quero me inscrever',
      disabled: true,
    },
  },
  {
    badge: 'Finalizado!',
    title: 'Impulso',
    bg: '/impulso.png',
    description:
      'Módulo Intermediário - Além de tudo que é oferecido no formato Estartando, você participará de 4 meses de aulas ao vivo e ainda:',
    list: [
      'Mentoria;',
      'Aulas de Soft Skills;',
      'Desenvolvimento de projetos.',
    ],
    button: {
      text: 'Quero me inscrever!',
      disabled: true,
      href: '/',
    },
  },
];

export const Modalities = () => {
  return (
    <S.ModalitiesSection
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
    >
      <S.Title>Modalidades</S.Title>
      <S.CardsWrapper>
        {modalities.map((modality) => (
          <S.Card key={modality.title}>
            <S.CardImage src={modality.bg} alt={modality.title} />
            <S.Badge>{modality.badge}</S.Badge>
            <S.CardContent>
              <S.CardTitle>{modality.title}</S.CardTitle>
              <S.CardDescription>{modality.description}</S.CardDescription>
              <S.CardList>
                {modality.list.map((item, i) => (
                  <S.CardItem key={i}>{item}</S.CardItem>
                ))}
              </S.CardList>
              {modality.button.disabled ? (
                <S.CardButton disabled>
                  <S.CardButtonText disabled>
                    {modality.button.text}
                  </S.CardButtonText>
                </S.CardButton>
              ) : (
                <a
                  href={modality.button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    width: '100%',
                    marginTop: 'auto',
                  }}
                >
                  <S.CardButton>
                    <S.CardButtonText>{modality.button.text}</S.CardButtonText>
                  </S.CardButton>
                </a>
              )}
            </S.CardContent>
          </S.Card>
        ))}
      </S.CardsWrapper>
    </S.ModalitiesSection>
  );
};

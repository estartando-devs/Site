/* eslint-disable @next/next/no-img-element */
import * as S from './styles';

const modalities = [
  {
    badge: 'Inscrições abertas!',
    title: 'Estartando',
    bg: '/estartando.png',
    description:
      'Seu primeiro passo no mundo da tecnologia começa aqui! Nesse módulo, você aprende do zero, com aulas gravadas e ao vivo pra ganhar confiança e dar o pontapé inicial na sua jornada.',
    list: [
      'Aulas gravadas para você rever quando quiser;',
      'Mentoria pra te guiar em cada etapa;',
      'Acesso à comunidade no Discord pra trocar ideias e tirar dúvidas;',
      'Aulas de Soft Skills pra se destacar no mercado.',
    ],
    button: {
      text: 'Encerrado',
      disabled: true,
      href: process.env.NEXT_PUBLIC_INSCRICOES_URL || '/',
    },
  },
  {
    badge: 'Finalizado!',
    title: 'Impulso',
    bg: '/impulso.png',
    description:
      'Hora de acelerar! Além de tudo do módulo inicial, aqui você participa de aulas ao vivo por 4 meses com conteúdo avançado, colocando a mão na massa e evoluindo de verdade.',
    list: [
      'Mentoria contínua pra acompanhar seu crescimento;',
      'Acesso à comunidade no Discord pra trocar ideias e tirar dúvidas;',

      'Aulas de Soft Skills pra se destacar no mercado;',
      'Projetos práticos pra ganhar experiência real.',
    ],
    button: {
      text: 'Quero evoluir!',
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

export interface ISelectiveProcessItem {
  title: string;
  description: string;
}

export const selectiveProcessMock: ISelectiveProcessItem[] = [
  {
    title: 'PREENCHIMENTO DO FORMULÁRIO',
    description:
      'Queremos conhecer você!\n Você preencherá um formulário com perguntas pessoais discursivas sobre sua experiência, história e formação, seja ela qual for. Selecionaremos os candidatos que se encaixam melhor com a nossa proposta para a próxima etapa.',
  },
  {
    title: 'BATE-PAPO COM O TIME',
    description:
      'Aqui a gente se conhece melhor!\n Agendaremos uma conversa online com nosso time para você mostrará seus estudos, projetos e portfólio. Também haverá uma avaliação técnica, onde faremos perguntas sobre os pré-requisitos para iniciar as aulas ao vivo. Não é necessário experiência profissional. Precisamos saber se você tem o conhecimento básico necessário.',
  },
];

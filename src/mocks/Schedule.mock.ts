export type Stages = {
  stage: {
    title: string;
    description: string;
  };
  key: string;
};
export interface ISchedule {
  title: string;
  description: string;
  disable?: boolean;
  dateEnd: string;
  friendlyDate?: string;
  key?: string;
}

export interface ScheduleSectionProps {
  title: string;
  description: string;
  stagesList: Stages[];
  schedule: ISchedule[];
}

const mock: ISchedule[] = [
  {
    title: 'Inscrições',
    description: '22 de abril a 2 de maio',
    dateEnd: '2026-05-01T23:59:00Z',
  },
  {
    title: 'Divulgação dos selecionados para entrevista',
    description: '03 de maio',
    dateEnd: '2026-05-03T23:59:00Z',
  },
  {
    title: 'Entrevistas',
    description: 'Entre os dias 04 e 09 de maio',
    dateEnd: '2026-05-09T23:59:00Z',
  },
  {
    title: 'Resultado final',
    description: '10 de maio',
    dateEnd: '2026-05-10T23:59:00Z',
  },
  {
    title: 'Aula inaugural',
    description: '12 de maio',
    dateEnd: '2026-05-12T23:59:00Z',
  },
];

const nextEvent: ISchedule | undefined =
  mock.find((current) => new Date(current.dateEnd) > new Date()) ||
  mock[mock.length - 1];

export const schedule: ISchedule[] = mock.map((current, index) => ({
  ...current,
  key: `scheduleData-${index}`,
  disable: current.title !== nextEvent?.title,
  friendlyDate: new Date(current.dateEnd).toLocaleDateString(),
}));

const stagesList: Stages[] = [
  {
    stage: {
      title: 'PREENCHIMENTO DO FORMULÁRIO',
      description:
        'Queremos conhecer você!\n Você preencherá um formulário com perguntas pessoais discursivas sobre sua experiência, história e formação, seja ela qual for. Selecionaremos os candidatos que se encaixam melhor com a nossa proposta para a próxima etapa.',
    },
    key: 'stage-1',
  },
  {
    stage: {
      title: 'BATE-PAPO COM O TIME',
      description: `Aqui a gente se conhece melhor!

         Agendaremos uma conversa online com nosso time para você mostrar seus estudos, projetos e portfólio. Também haverá uma avaliação técnica, onde faremos perguntas sobre os pré-requisitos para iniciar as aulas ao vivo. Não é necessário experiência profissional. Precisamos saber se você tem o conhecimento básico necessário.`,
    },
    key: 'stage-3',
  },
];

export const scheduleMock: ScheduleSectionProps = {
  title: `Nosso <span>processo seletivo</span> tem 2 etapas:`,
  description: ` Acreditamos no poder da <span>transformação social</span> através da
  Tecnologia da Informação. Por isso, oferecemos uma formação objetiva e
  focada nas exigências do mercado de TI. Os dois cursos incluem ainda
  conhecimentos em métodos de gestão ágil de projetos utilizados no mercado
  para o desenvolvimento de trabalhos em equipe, além de assessoria no
  Linkedin e direcionamento de carreira.`,
  stagesList,
  schedule,
};

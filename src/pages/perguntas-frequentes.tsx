import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import {
  CommonQuestions,
  CommonQuestionsProps,
  Footer,
  Layout,
} from '../components';
import { frequentlyAskedQuestions } from '../mocks/frequentlyAskedQuestions.mock';

type CommonQuestions = Omit<CommonQuestionsProps, 'title'>;

export const getStaticProps: GetStaticProps<
  CommonQuestionsProps
> = async () => {
  const response = frequentlyAskedQuestions;

  const {
    title,
    data: { questions },
  } = response ?? {
    title: 'Perguntas <br/><span>frequentes</span>',
    data: { questions: [] },
  };

  const props: CommonQuestionsProps = {
    title,
    questions:
      questions.map((content, key) => ({
        ...content,
        key: `question-${key}`,
      })) || [],
  };

  return {
    props,
    revalidate: 300,
  };
};

export default function PerguntasFrequentes(props: CommonQuestionsProps) {
  return (
    <Layout>
      <NextSeo
        title="Perguntas Frequentes"
        description="Encontre respostas para as perguntas mais frequentes sobre o Estartando Devs. Saiba mais sobre nossos cursos, inscrições, mentores e como transformar sua carreira com tecnologia."
        openGraph={{
          url: 'https://estartandodevs.com.br/perguntas-frequentes',
        }}
        canonical="https://www.estartandodevs.com.br/perguntas-frequentes"
      />
      <CommonQuestions {...props} />
      <Footer />
    </Layout>
  );
}
